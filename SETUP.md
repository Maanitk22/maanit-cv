# Phase 2 Setup Guide
## Supabase + Gmail API in ~15 minutes

---

## Step 1 — Supabase (5 min)

1. Go to https://supabase.com → Sign up (free) → New project
   - Name: `maanit-cv`
   - Password: (save this)
   - Region: South Asia (Mumbai)

2. Once created, go to **SQL Editor → New query**
   Paste the contents of `supabase-schema.sql` and click **Run**

3. Go to **Settings → API**
   Copy two values into `.env.local`:
   - `Project URL` → SUPABASE_URL
   - `anon public` key → SUPABASE_ANON_KEY

---

## Step 2 — Gmail OAuth2 (10 min)

### 2a. Create a Google Cloud project

1. Go to https://console.cloud.google.com
2. New Project → name it `maanit-cv`
3. Search "Gmail API" → Enable it

### 2b. Create OAuth2 credentials

1. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**
2. Application type: **Web application**
3. Name: `maanit-cv contact`
4. Authorized redirect URIs: add `https://developers.google.com/oauthplayground`
5. Click **Create** → copy **Client ID** and **Client Secret** into `.env.local`

### 2c. Configure OAuth consent screen (if prompted)

1. Go to **OAuth consent screen**
2. User type: External → Fill in app name `maanit-cv`, your email
3. Scopes: add `https://www.googleapis.com/auth/gmail.send`
4. Test users: add `maanitkhatkar22@gmail.com`

### 2d. Get your refresh token (one-time)

1. Go to https://developers.google.com/oauthplayground
2. Click the gear icon (top right) → tick **"Use your own OAuth credentials"**
3. Paste your **Client ID** and **Client Secret**
4. In the left panel, find **Gmail API v1** → select `https://www.googleapis.com/auth/gmail.send`
5. Click **Authorize APIs** → log in with `maanitkhatkar22@gmail.com` → Allow
6. Click **Exchange authorization code for tokens**
7. Copy the **Refresh token** → paste into `.env.local` as `GMAIL_REFRESH_TOKEN`

---

## Step 3 — Add env vars to Vercel

1. Go to vercel.com → your project → **Settings → Environment Variables**
2. Add each key from `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `GMAIL_CLIENT_ID`
   - `GMAIL_CLIENT_SECRET`
   - `GMAIL_REFRESH_TOKEN`
3. Set environment: **Production** (and Preview if you want)

---

## Step 4 — Test locally

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project (first time only)
vercel link

# Pull env vars to your local machine
vercel env pull .env.local

# Run with serverless functions working locally
vercel dev
```

Open http://localhost:3000 → fill the contact form → check:
- Your Gmail inbox for the notification email
- Supabase dashboard → Table Editor → contact_submissions

---

## Viewing submissions

In Supabase → Table Editor → `contact_submissions`
Or run this query anytime:

```sql
select name, email, subject, left(message,60) as msg, created_at
from contact_submissions
order by created_at desc;
```

---

## That's it!

Every form submission now:
1. Hits `/api/contact` (your Vercel edge function)
2. Gets validated server-side
3. Gets stored permanently in Supabase
4. Sends you an email notification with a Reply-To set to the sender
