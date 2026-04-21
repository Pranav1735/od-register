# OD Register — Setup Guide

## What You'll Need (all free)
1. A **GitHub** account → github.com
2. A **Supabase** account → supabase.com
3. A **Vercel** account → vercel.com

---

## STEP 1 — Create your Supabase Database

1. Go to **https://supabase.com** → Sign Up → Create a new project
2. Give it a name like `od-register` and set a strong password
3. Wait ~2 minutes for the project to be created
4. Go to the **SQL Editor** (left sidebar) and paste this SQL, then click RUN:

```sql
CREATE TABLE od_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  register_no TEXT,
  student_name TEXT,
  program TEXT,
  year TEXT,
  od_timing TEXT,
  activity_description TEXT,
  place TEXT,
  from_date DATE,
  to_date DATE,
  camp_name TEXT,
  entered_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE od_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON od_entries FOR ALL USING (true) WITH CHECK (true);
```

5. Now go to **Settings → API** (left sidebar)
6. Copy your **Project URL** and **anon public key**

---

## STEP 2 — Edit config.js

Open the `config.js` file and paste your details:

```js
const SUPABASE_URL = "https://xxxxxxxxxxxx.supabase.co";   // ← paste here
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1Ni...";         // ← paste here
const ADMIN_PASSWORD = "yourSecurePassword";                // ← change this!
```

---

## STEP 3 — Upload to GitHub

1. Go to **https://github.com** → New repository
2. Name it `od-register` → Public → Create
3. Click **"uploading an existing file"** link
4. Drag and drop ALL 4 files:
   - `index.html`
   - `admin.html`
   - `branches.js`
   - `config.js`
5. Click **Commit changes**

---

## STEP 4 — Deploy on Vercel

1. Go to **https://vercel.com** → Sign up with your GitHub account
2. Click **"Add New Project"**
3. Select your `od-register` repository
4. Click **Deploy** (no other settings needed)
5. Wait ~30 seconds → your site is live! ✅

You'll get a URL like: `https://od-register-abc.vercel.app`

---

## How to Use

| Who | URL | What they do |
|-----|-----|--------------|
| Staff (5 people) | `yoursite.vercel.app` (index.html) | Enter OD records |
| Admin (you) | `yoursite.vercel.app/admin.html` | View all entries live |

### Staff Flow:
1. Open the link
2. Type your name + camp name (once)
3. Enter Register Number → Branch & Year auto-fill
4. Fill remaining details → Submit

### Admin Flow:
1. Open `/admin.html`
2. Enter admin password
3. See ALL entries from ALL camps, live
4. Filter by camp / date / search
5. Export to Excel anytime

---

## Adding a New Branch Later

Open `branches.js` and add a new line inside the `BRANCHES` object:

```js
"XXX": { name: "Your New Branch Name", yearType: "btech" },
```

`yearType` options:
- `"btech"` → 26=4th, 27=3rd, 28=2nd, 29=1st
- `"bcom"` → 26=3rd, 27=2nd, 28=1st
- `"llb"` → 26=5th through 30=1st
- `"manual"` → staff fills year manually

Then commit the file to GitHub — Vercel auto-deploys in ~30 seconds!

---

## Real-Time Updates

The admin dashboard auto-refreshes whenever any staff member submits an entry.
You don't need to refresh the page — the green dot means it's live! 🟢
