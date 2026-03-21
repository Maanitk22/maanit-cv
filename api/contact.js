// api/contact.js — Vercel Serverless Function (Edge Runtime)
// Form POST → save to Supabase → send Gmail notification

export const config = { runtime: 'edge' }

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: corsHeaders,
    })
  }

  try {
    const { name, email, subject, message } = await req.json()

    // Validate
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Name, email and message are required.' }),
        { status: 400, headers: corsHeaders }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address.' }),
        { status: 400, headers: corsHeaders }
      )
    }

    const timestamp = new Date().toISOString()

    // Run both in parallel — fail loudly if either throws
    await Promise.all([
      saveToSupabase({ name, email, subject, message, timestamp }),
      sendGmailNotification({ name, email, subject, message, timestamp }),
    ])

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders }
    )
  } catch (err) {
    console.error('[contact] error:', err.message)
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: corsHeaders }
    )
  }
}

// ─── Supabase ────────────────────────────────────────────────────────────────
async function saveToSupabase({ name, email, subject, message, timestamp }) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/contact_submissions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ name, email, subject, message, created_at: timestamp }),
    }
  )
  if (!res.ok) throw new Error(`Supabase: ${await res.text()}`)
}

// ─── Gmail (OAuth2 refresh flow) ─────────────────────────────────────────────
async function sendGmailNotification({ name, email, subject, message, timestamp }) {
  // 1. Exchange refresh token for a live access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      grant_type:    'refresh_token',
    }),
  })
  const { access_token } = await tokenRes.json()

  // 2. Compose the email body
  const localTime = new Date(timestamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const emailLines = [
    `To: maanitkhatkar22@gmail.com`,
    `Reply-To: "${name}" <${email}>`,
    `Subject: [CV Contact] ${subject || 'New message'} — from ${name}`,
    `Content-Type: text/plain; charset=utf-8`,
    `MIME-Version: 1.0`,
    ``,
    `You have a new message from your CV website.`,
    ``,
    `Name    : ${name}`,
    `Email   : ${email}`,
    `Subject : ${subject || '(none)'}`,
    `Time    : ${localTime}`,
    ``,
    `Message`,
    `───────────────────────────────────────`,
    message,
    `───────────────────────────────────────`,
    ``,
    `Hit reply to respond directly to ${email}.`,
  ]

  // 3. Base64url encode the RFC 2822 message
  const raw = emailLines.join('\r\n')
  const encoded = btoa(unescape(encodeURIComponent(raw)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  // 4. Send via Gmail API
  const sendRes = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encoded }),
    }
  )
  if (!sendRes.ok) throw new Error(`Gmail: ${await sendRes.text()}`)
}
