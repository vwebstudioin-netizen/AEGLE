# AEGLE Skin Care Clinic — Deployment Guide

> **Template:** AEGLE Premium (based on Hospital Large + Beauty Features)
> **Stack:** Next.js 16 · React 19 · Tailwind v4 · Firebase · Razorpay · OpenAI
> **Cost:** ₹0/month (all free tiers) + OpenAI API usage

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Architecture Overview](#2-architecture-overview)
3. [Firebase Setup](#3-firebase-setup)
4. [Razorpay Setup](#4-razorpay-setup)
5. [Email / SMTP Setup](#5-email--smtp-setup)
6. [Environment Variables](#6-environment-variables)
7. [Local Development](#7-local-development)
8. [GitHub Repository](#8-github-repository)
9. [Vercel Deployment](#9-vercel-deployment)
10. [Custom Domain](#10-custom-domain)
11. [OpenAI Setup (Aura Chatbot)](#11-openai-setup-aura-chatbot)
12. [AI Chatbot Configuration](#12-ai-chatbot-configuration)
13. [Shop & Product Management](#13-shop--product-management)
14. [Firestore Rules & Indexes](#14-firestore-rules--indexes)
15. [Image Seed & Migration](#15-image-seed--migration)
16. [Post-Deployment Checklist](#16-post-deployment-checklist)
17. [Free Tier Limits](#17-free-tier-limits)
18. [Troubleshooting](#18-troubleshooting)

---

## 1. Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | ≥ 18.18 | Runtime |
| **npm** | ≥ 9 | Package manager |
| **Git** | Latest | Version control |
| **GitHub** account | Free | Code hosting |
| **Vercel** account | Hobby (free) | Hosting & CI/CD |
| **Firebase** account | Spark (free) | Auth, Firestore, Storage |
| **Razorpay** account | Standard (free) | Payment processing |
| **Gmail** (or SMTP) | Free | Transactional emails |
| **OpenAI** account | Platform | AI chatbot (Aura) |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Vercel (Hobby - Free)                      │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────────┐  │
│  │  Next.js    │  │  API Routes  │  │  AI Chatbot (Aura)   │  │
│  │  SSG / ISR  │  │  /api/*      │  │  Enquiry → Firestore │  │
│  └────────────┘  └─────────────┘  └──────────────────────┘  │
└───────────┬──────────────┬────────────────────┬─────────────┘
            │              │                    │
     ┌──────▼──────┐ ┌────▼────┐  ┌────────────▼──────────┐
     │  Firebase    │ │Razorpay │  │  OpenAI API            │
     │  Spark Plan  │ │Standard │  │  gpt-4o-mini           │
     │  • Auth      │ │ 2%/txn  │  │  (Aura chatbot brain)  │
     │  • Firestore │ │         │  │                        │
     │  • Storage   │ │         │  │  Gmail SMTP            │
     └─────────────┘ └─────────┘  └────────────────────────┘
```

**Monthly Cost: ₹0** (within free tier limits)

---

## 3. Firebase Setup

### 3.1 Create Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → name it `aegle-skin-clinic`
3. Disable Google Analytics (optional for free tier)
4. Click **Create project**

### 3.2 Enable Authentication
1. **Build → Authentication → Get started**
2. Enable **Email/Password** sign-in method
3. (Optional) Enable **Google** sign-in

### 3.3 Create Firestore Database
1. **Build → Firestore Database → Create database**
2. Choose **Start in production mode**
3. Select region: `asia-south1` (Mumbai)
4. Apply security rules from [Section 12](#12-firestore-rules--indexes)

### 3.4 Enable Storage
1. **Build → Storage → Get started**
2. Start in production mode
3. Default bucket will be created
4. Set CORS for image uploads (see below)

#### Firebase Storage CORS Configuration
Create a `cors.json` file:
```json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```
Apply with:
```bash
gsutil cors set cors.json gs://your-bucket-name.appspot.com
```
This is needed for product image uploads from the admin shop page.

### 3.5 Get Client Config
1. **Project settings → General → Your apps → Web app**
2. Click **Add app** (web `</>`)
3. Register app name: `aegle-web`
4. Copy the `firebaseConfig` object — you'll need these 6 values for `.env.local`

### 3.6 Generate Admin SDK Key
1. **Project settings → Service accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Extract `project_id`, `client_email`, and `private_key`

---

## 4. Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Complete KYC verification
3. Go to **Settings → API Keys → Generate Key**
4. Save the `key_id` and `key_secret`
5. For development, use **Test Mode** keys

| Setting | Value |
|---------|-------|
| Mode | Test (dev) → Live (prod) |
| Fee | 2% per transaction |
| Settlement | T+2 business days |

---

## 5. Email / SMTP Setup

### Gmail App Password (Recommended for Free)
1. Enable 2-Step Verification on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password as `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=aegle.clinic@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
```

**Free limit:** 500 emails/day with Gmail

---

## 6. Environment Variables

Create `.env.local` in the project root:

```env
# ── Firebase Client ──
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=aegle-skin-clinic.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=aegle-skin-clinic
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=aegle-skin-clinic.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxx

# ── Firebase Admin ──
FIREBASE_PROJECT_ID=aegle-skin-clinic
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@aegle-skin-clinic.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ── Email (SMTP) ──
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=aegle.clinic@gmail.com
SMTP_PASS=your-app-password

# ── Clinic ──
CLINIC_EMAIL=info@aegleclinic.com
CLINIC_NAME=AEGLE Skin Care Clinic

# ── OpenAI (Aura AI Chatbot) ──
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini

# ── Razorpay ──
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# ── ISR Revalidation ──
REVALIDATION_SECRET=your-secret-key

# ── Site ──
NEXT_PUBLIC_SITE_URL=https://aegleclinic.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

> **Note:** The AI chatbot (Aura) uses OpenAI's `gpt-4o-mini` model via the `/api/chat` route. If `OPENAI_API_KEY` is not set, the chatbot will show a graceful fallback message asking users to call instead.

---

## 7. Local Development

```bash
# Clone the repo
git clone https://github.com/your-org/aegle-skin-clinic.git
cd aegle-skin-clinic

# Install dependencies
npm install

# Create env file (copy from .env.example)
cp .env.example .env.local
# Edit .env.local with your actual keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Key URLs in Development
| URL | Description |
|-----|-------------|
| `/` | Home page |
| `/treatments` | 9 treatment categories |
| `/doctors` | Dr. Surekha & Dr. Nithya |
| `/admin` | Admin login (demo: `admin@aegleclinic.com` / `admin123`) |
| `/admin/dashboard` | Admin dashboard |
| `/admin/enquiries` | AI chatbot enquiry manager |
| `/admin/shop` | Product / shop manager |
| `/api/enquiry` | Chatbot enquiry API endpoint |
| `/api/chat` | OpenAI chatbot conversation API |
| `/api/products` | Product CRUD API |

---

## 8. GitHub Repository

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial AEGLE Skin Care Clinic setup"

# Create repo on GitHub and push
git remote add origin https://github.com/your-org/aegle-skin-clinic.git
git branch -M main
git push -u origin main
```

**Important:** Never commit `.env.local` — it's already in `.gitignore`.

---

## 9. Vercel Deployment

### 9.1 Import Project
1. Go to [vercel.com](https://vercel.com) → **Add New → Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)

### 9.2 Add Environment Variables
1. In Vercel project settings → **Environment Variables**
2. Add ALL variables from your `.env.local`
3. Ensure `FIREBASE_PRIVATE_KEY` is added with proper escaping

### 9.3 Deploy
1. Click **Deploy**
2. Vercel builds and deploys automatically
3. Future pushes to `main` auto-deploy

---

## 10. Custom Domain

1. In Vercel → **Settings → Domains**
2. Add `aegleclinic.com` (or your domain)
3. Update DNS records at your registrar:
   - **A Record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com` (for `www`)
4. SSL is automatic (free via Let's Encrypt)

---

## 11. OpenAI Setup (Aura Chatbot)

### 11.1 Get API Key
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** → **Create new secret key**
4. Copy the key (starts with `sk-`)
5. Add to `.env.local` as `OPENAI_API_KEY`

### 11.2 Choose Model
Set `OPENAI_MODEL` in your env. Options:

| Model | Cost (per 1M tokens) | Best For |
|-------|---------------------|----------|
| `gpt-4o-mini` | ~$0.15 input / $0.60 output | **Recommended** — fast, cheap, smart enough |
| `gpt-4o` | ~$2.50 input / $10 output | Premium conversations |
| `gpt-3.5-turbo` | ~$0.50 input / $1.50 output | Budget option |

### 11.3 Cost Estimate
Each chatbot conversation is ~5–8 API calls × ~300 tokens each ≈ **~2,000 tokens per lead**.

| Monthly Leads | Tokens Used | Estimated Cost |
|--------------|-------------|----------------|
| 50 leads | ~100K tokens | **~₹1–2** |
| 200 leads | ~400K tokens | **~₹5–8** |
| 1,000 leads | ~2M tokens | **~₹25–40** |

> 💡 With `gpt-4o-mini`, even 1,000 leads/month costs less than a cup of coffee.

### 11.4 How It Works
1. User opens chat → `/api/chat` is called with system prompt
2. System prompt instructs Aura to collect name, phone, interest
3. Each user message → OpenAI generates context-aware reply
4. When user confirms → `/api/enquiry` saves lead to Firestore
5. Admin reviews leads at `/admin/enquiries`

### 11.5 Fallback (No API Key)
If `OPENAI_API_KEY` is not configured, the chatbot shows:
> "I'm having a slight issue right now. Please call us at 8050507755!"

This ensures the website never breaks, even without OpenAI.

---

## 12. AI Chatbot Configuration

The AEGLE website uses a custom AI chatbot named **"Aura"** powered by **OpenAI GPT-4o-mini** instead of third-party widgets like Tawk.to or WhatsApp. It has natural conversations and collects lead information intelligently.

### How It Works
1. **User opens chat** → Aura greets (AI-generated, natural language)
2. **Conversational flow** → AI naturally asks for name, phone, treatment interest
3. **Validates phone** → Must be valid 10-digit Indian mobile
4. **Confirms details** → Shows summary and asks user to confirm
5. **Submits enquiry** → Saved to Firestore `enquiries` collection via `/api/enquiry`
6. **Admin reviews** → At `/admin/enquiries` — filter, search, call, WhatsApp

### Firestore Document Structure (`enquiries` collection)

```typescript
{
  name: "Priya Sharma",           // From chatbot
  phone: "9876543210",            // Validated 10-digit
  interest: "Skin Treatment",     // Category or custom text
  status: "new",                  // new | contacted | converted | closed
  source: "chatbot",              // Always "chatbot"
  createdAt: Timestamp,           // Server timestamp
  notes: ""                       // Admin can add notes
}
```

### Admin Enquiry Management
- **URL:** `/admin/enquiries`
- **Features:** Filter by status, search by name/phone/interest
- **Actions:** Direct call button, WhatsApp message button
- **Stats:** Total, New, Contacted, Converted counts

### No Monthly Chat Subscription
Unlike Tawk.to or WhatsApp Business API, the Aura chatbot uses your own OpenAI API key. No monthly subscription, no per-seat fees, no third-party data sharing. You only pay for actual API usage (~₹1–10/month for typical clinics).

---

## 13. Shop & Product Management

The AEGLE admin dashboard includes a built-in **Shop Manager** for managing skin care products.

### How It Works
- **Product images** → Uploaded to **Firebase Storage** (under `products/` folder)
- **Product data** → Stored in **Firestore** `products` collection
- **Admin page** → `/admin/shop` — full CRUD (Create, Read, Update, Delete)
- **API route** → `/api/products` (GET, POST, PUT, DELETE)

### Admin Shop Features
- Add products with image upload (JPG, PNG, WebP)
- Set price, compare price (strike-through), stock count
- Categorise: Serums, Moisturisers, Cleansers, Creams, Sunscreens, etc.
- Mark as Featured ⭐ or Active/Hidden
- Add ingredients, how-to-use, suitable skin types
- Search & filter in the product table
- Edit or delete any product

### Firestore Document Structure (`products` collection)

```typescript
{
  name: "AEGLE Vitamin C Serum",
  slug: "aegle-vitamin-c-serum",
  description: "Brightening serum with 20% Vitamin C",
  longDescription: "Full product page description...",
  price: 1299,
  comparePrice: 1599,              // Optional strike-through
  currency: "INR",
  category: "Serums",
  tags: ["brightening", "vitamin-c"],
  images: ["https://storage.googleapis.com/.../product.jpg"],
  thumbnail: "https://storage.googleapis.com/.../product.jpg",
  sku: "AEGLE-VCS-001",
  stock: 45,
  featured: true,
  active: true,
  rating: 4.8,
  reviewCount: 124,
  brand: "AEGLE",
  weight: "30ml",
  ingredients: "Vitamin C, Hyaluronic Acid...",
  howToUse: "Apply 2-3 drops...",
  suitableFor: ["All skin types"],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Firebase Storage Rules
Add these rules for product image uploads:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product images — admin upload, public read
    match /products/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 14. Firestore Rules & Indexes

### Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Enquiries — write from API, read from admin
    match /enquiries/{docId} {
      allow read: if request.auth != null;
      allow create: if true;  // API route creates
      allow update, delete: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Appointments
    match /appointments/{docId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }

    // Contact messages
    match /contactMessages/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Reviews — public read, auth write
    match /reviews/{docId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }

    // Blog posts — public read
    match /blogPosts/{docId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Products — public read, admin write
    match /products/{docId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Doctors — public read
    match /doctors/{docId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Services — public read
    match /services/{docId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Newsletters
    match /newsletters/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null
        && request.auth.token.admin == true;
    }

    // Payments
    match /payments/{docId} {
      allow read: if request.auth != null
        && (request.auth.uid == resource.data.userId
            || request.auth.token.admin == true);
      allow create: if request.auth != null;
    }

    // Audit log — admin only
    match /auditLog/{docId} {
      allow read: if request.auth != null
        && request.auth.token.admin == true;
      allow create: if request.auth != null;
    }

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Composite Indexes

Create these in Firebase Console → Firestore → Indexes:

| Collection | Fields | Order |
|-----------|--------|-------|
| `enquiries` | `status` ASC, `createdAt` DESC | Composite |
| `enquiries` | `createdAt` DESC | Single |
| `products` | `category` ASC, `createdAt` DESC | Composite |
| `products` | `featured` ASC, `createdAt` DESC | Composite |
| `products` | `active` ASC, `createdAt` DESC | Composite |
| `appointments` | `status` ASC, `date` DESC | Composite |
| `reviews` | `approved` ASC, `createdAt` DESC | Composite |
| `blogPosts` | `published` ASC, `publishedAt` DESC | Composite |
| `auditLog` | `createdAt` DESC | Single |

---

## 15. Image Seed & Migration

The project includes a **seed script** to download images from any URL (Unsplash, other websites, Google, etc.) and upload them to Firebase Storage. This replaces external image dependencies with your own hosted copies.

### Quick Start

```bash
# Preview what will be uploaded (no changes)
npm run seed:images:dry

# Upload all images to Firebase Storage
npm run seed:images

# Replace old URLs in data files with new Storage URLs
npm run seed:replace-urls
```

### How It Works

1. **`scripts/seed-images.ts`** — Downloads images from URLs, uploads to Firebase Storage
2. **`scripts/seed-config.json`** — JSON config of images (edit this to add your own)
3. **`scripts/replace-image-urls.ts`** — Replaces old URLs in data files with new Firebase URLs

### Adding Your Own Images

**Option A: Edit the JSON config**
```bash
# Edit scripts/seed-config.json, then:
npx tsx scripts/seed-images.ts --config=scripts/seed-config.json
```

**Option B: Edit the TypeScript directly**
```bash
# Edit the SEED_IMAGES array in scripts/seed-images.ts, then:
npm run seed:images
```

### JSON Config Format

```json
[
  {
    "url": "https://any-website.com/image.jpg",
    "path": "doctors/dr-surekha.jpg",
    "alt": "Dr. Surekha profile photo"
  },
  {
    "url": "https://example.com/clinic-photo.jpg",
    "path": "locations/koramangala.jpg",
    "alt": "Koramangala clinic exterior"
  }
]
```

### Storage Folder Structure

| Folder | Purpose |
|--------|--------|
| `doctors/` | Doctor profile photos |
| `departments/` | Department/category hero images |
| `services/` | Treatment/service images |
| `locations/` | Clinic location photos |
| `products/` | Shop product images (also via admin) |
| `gallery/` | Before/after, clinic gallery |
| `hero/` | Homepage hero banners |
| `blog/` | Blog post images |

### Output Files

After running the seed script:
- **`scripts/seed-url-mapping.json`** — Old URL → New URL mapping
- **`scripts/seed-results.json`** — Detailed results with success/fail status

### Full Workflow Example

```bash
# 1. Add your image URLs to scripts/seed-config.json
# 2. Preview (no uploads)
npm run seed:images:dry

# 3. Upload to Firebase Storage
npm run seed:images

# 4. Auto-replace URLs in src/data/*.ts files
npm run seed:replace-urls

# 5. Verify & rebuild
npm run build
```

---

## 16. Post-Deployment Checklist

### Must Do ✅
- [ ] Verify all env variables are set in Vercel
- [ ] Set `OPENAI_API_KEY` and `OPENAI_MODEL` in Vercel env
- [ ] Test AI chatbot conversation end-to-end
- [ ] Verify enquiry appears in `/admin/enquiries`
- [ ] Test admin login at `/admin`
- [ ] Add first product in `/admin/shop`
- [ ] Verify product image uploads to Firebase Storage
- [ ] Check all 9 treatment category pages load
- [ ] Verify both doctor pages (Dr. Surekha, Dr. Nithya)
- [ ] Test appointment booking flow
- [ ] Check Razorpay payment in test mode
- [ ] Verify Firestore security rules deployed
- [ ] Set Firebase Storage rules for product images
- [ ] Set up custom domain & verify SSL
- [ ] Test on mobile (responsive check)

### Recommended 📌
- [ ] Run `npm run seed:images` to migrate images to Firebase Storage
- [ ] Run `npm run seed:replace-urls` to update data files
- [ ] Add real doctor profile images to seed config
- [ ] Replace placeholder clinic photos in gallery
- [ ] Update `PROMO_CONFIG` in `constants.ts` for current promotion
- [ ] Set up Firebase Auth admin custom claim
- [ ] Configure email templates in `src/lib/email.ts`
- [ ] Test email delivery via SMTP
- [ ] Set up Google Analytics (optional)
- [ ] Add `robots.txt` and `sitemap.xml` for SEO

---

## 17. Free Tier Limits

| Service | Free Limit | AEGLE Usage Estimate |
|---------|-----------|---------------------|
| **Vercel Hobby** | 100 GB bandwidth/mo | ~5-15 GB |
| **Vercel** | 100 builds/day | ~2-5 builds |
| **Firestore** | 50K reads/day | ~5-20K |
| **Firestore** | 20K writes/day | ~100-500 |
| **Firestore** | 1 GiB storage | ~50-100 MB |
| **Firebase Auth** | 50K MAU | ~500-2K |
| **Firebase Storage** | 5 GB | ~1-2 GB |
| **Gmail SMTP** | 500 emails/day | ~10-50 |
| **Razorpay** | No fixed fee | 2% per txn |
| **OpenAI (gpt-4o-mini)** | $0.15/1M input tokens | ~₹1–10/month |

> 💡 **These free limits are more than sufficient** for a skin care clinic. OpenAI costs are pay-per-use and extremely low with gpt-4o-mini.

---

## 18. Troubleshooting

### Build Errors

| Error | Solution |
|-------|----------|
| `Module not found` | Run `npm install` |
| `Type error: Property does not exist` | Check `src/types/index.ts` for missing fields |
| `FIREBASE_PRIVATE_KEY` error | Ensure key is wrapped in double quotes with `\n` |
| `Invalid environment variable` | Check `.env.local` has no trailing spaces |

### Runtime Issues

| Issue | Solution |
|-------|----------|
| Chatbot not saving enquiries | Check Firebase Admin SDK credentials |
| Chatbot not responding | Check `OPENAI_API_KEY` is set and valid |
| Chatbot shows fallback message | OpenAI API key missing or expired |
| Product images not uploading | Check Firebase Storage rules and CORS config |
| Admin dashboard shows no enquiries | Verify `/api/enquiry` GET route works |
| Razorpay payment fails | Ensure `RAZORPAY_KEY_SECRET` is correct |
| Emails not sending | Verify Gmail app password, check spam folder |
| Images not loading | Check Firebase Storage CORS configuration |

### Firebase Admin Not Working
```bash
# Verify credentials are set
echo $FIREBASE_PROJECT_ID
echo $FIREBASE_CLIENT_EMAIL
# Private key should start with -----BEGIN PRIVATE KEY-----
```

### Quick Health Check
```bash
# Build locally
npm run build

# Test chatbot API (OpenAI)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'

# Test enquiry API
curl -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"9876543210","interest":"Skin Treatment"}'

# Test products API
curl http://localhost:3000/api/products

# Test enquiry fetch
curl http://localhost:3000/api/enquiry
```

---

## Support

- **Developer:** MYW Templates / VWebStudio
- **Template:** AEGLE Premium Skin Care
- **Docs:** This file (`DEPLOYMENT-GUIDE.md`)
- **Client:** AEGLE — Goddess of Radiant Health & Beauty

---

*Last updated: March 2026*
