// api/contact.js — Vercel Serverless Function (Edge Runtime)
// Form POST → save to Supabase → notify Maanit → auto-reply to sender

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

    // Get OAuth token once — reuse for both emails
    const access_token = await getAccessToken()

    // Run all three in parallel
    await Promise.all([
      saveToSupabase({ name, email, subject, message, timestamp }),
      sendNotificationToMaanit({ name, email, subject, message, timestamp, access_token }),
      sendAutoReplyToSender({ name, email, subject, message, access_token }),
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

// ─── OAuth2: get fresh access token ──────────────────────────────────────────
async function getAccessToken() {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      grant_type:    'refresh_token',
    }),
  })
  const data = await res.json()
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`)
  return data.access_token
}

// ─── Supabase ─────────────────────────────────────────────────────────────────
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

// ─── Email 1: Notification to Maanit ─────────────────────────────────────────
async function sendNotificationToMaanit({ name, email, subject, message, timestamp, access_token }) {
  const localTime = new Date(timestamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short',
  })

  const lines = [
    `To: maanitkhatkar22@gmail.com`,
    `Reply-To: "${name}" <${email}>`,
    `Subject: [CV Contact] ${subject || 'New message'} — from ${name}`,
    `Content-Type: text/plain; charset=utf-8`,
    `MIME-Version: 1.0`,
    ``,
    `New message from your CV website.`,
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

  await sendEmail(lines.join('\r\n'), access_token)
}

// ─── Email 2: Auto-reply to the sender ───────────────────────────────────────
async function sendAutoReplyToSender({ name, email, subject, message, access_token }) {
  const firstName = name.trim().split(' ')[0]

  // Detect topic from subject/message for a slightly personalised opening
  const combined = `${subject || ''} ${message}`.toLowerCase()
  let topicLine = `I've received your message`
  if (combined.includes('blockchain') || combined.includes('web3') || combined.includes('solidity')) {
    topicLine = `I noticed you're reaching out about blockchain/Web3 — always happy to talk about that`
  } else if (combined.includes('ai') || combined.includes('ml') || combined.includes('interview') || combined.includes('prep')) {
    topicLine = `I noticed you're reaching out about AI — great topic to connect on`
  } else if (combined.includes('job') || combined.includes('internship') || combined.includes('opportunity') || combined.includes('hire') || combined.includes('role')) {
    topicLine = `I noticed you're reaching out about a potential opportunity — I'd love to learn more`
  } else if (combined.includes('project') || combined.includes('collaborate') || combined.includes('collab')) {
    topicLine = `I noticed you're interested in collaborating — always open to working on exciting projects`
  } else if (subject) {
    topicLine = `I've received your message regarding "${subject}"`
  }

  const lines = [
    `To: "${name}" <${email}>`,
    `From: "Maanit Khatkar" <maanitkhatkar22@gmail.com>`,
    `Subject: Re: ${subject || 'Your message'} — Maanit Khatkar`,
    `Content-Type: text/plain; charset=utf-8`,
    `MIME-Version: 1.0`,
    ``,
    `Hi ${firstName},`,
    ``,
    `Thanks for reaching out! ${topicLine} and will get back to you shortly.`,
    ``,
    `I typically respond within 24–48 hours. In the meantime, feel free to check out my work:`,
    ``,
    `  GitHub   → https://github.com/Maanitk22`,
    `  LinkedIn → https://linkedin.com/in/maanitkhatkar`,
    ``,
    `Talk soon,`,
    `Maanit Khatkar`,
    `Computer Science Engineer · Blockchain & AI Builder`,
    `CCET, Chandigarh`,
    ``,
    `─────────────────────────────────────────────`,
    `Your original message:`,
    message,
  ]

  await sendEmail(lines.join('\r\n'), access_token)
}

// ─── Shared Gmail send helper ─────────────────────────────────────────────────
async function sendEmail(raw, access_token) {
  const encoded = btoa(unescape(encodeURIComponent(raw)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const res = await fetch(
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
  if (!res.ok) throw new Error(`Gmail send: ${await res.text()}`)
}
