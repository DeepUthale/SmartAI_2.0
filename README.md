# SmartAI

An AI SaaS platform built with Next.js 14 that brings together multiple state-of-the-art AI models in one workspace.

## Features

- **Conversation** - Chat with GPT-3.5 Turbo
- **Image Generation** - Create images with DALL-E
- **Video Generation** - Synthesise videos with Zeroscope v2 XL
- **Music Generation** - Compose music with Riffusion
- **Code Generation** - Generate and debug code with GPT-3.5
- **Subscription** - Free tier (5 generations) + Pro plan via Stripe

## Tech Stack

- **Framework** - Next.js 14 (App Router)
- **Auth** - Clerk
- **Database** - PostgreSQL + Prisma (Neon)
- **Payments** - Stripe
- **AI** - OpenAI, Replicate
- **Styling** - Tailwind CSS, shadcn/ui

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root with the following:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (Neon / PostgreSQL)
DATABASE_URL=
DIRECT_URL=

# AI
OPENAI_API_KEY=
REPLICATE_API_TOKEN=

# Stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Push database schema

```bash
npx prisma db push
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Stripe webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## Project Structure

```
app/
├── (auth)/          # Sign in / Sign up pages
├── (landing)/       # Public landing page
├── (dashboard)/     # Protected dashboard & tools
│   └── (routes)/
│       ├── conversation/
│       ├── image/
│       ├── video/
│       ├── music/
│       ├── code/
│       └── settings/
└── api/             # API routes (AI + Stripe)

components/          # Shared UI components
lib/                 # Utilities, Prisma client, Stripe
prisma/              # Database schema
```

## License

MIT
