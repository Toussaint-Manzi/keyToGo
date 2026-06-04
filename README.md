# KeyTOGO Group Inc. — Company Website

Next.js 16 marketing site with PostgreSQL, Prisma, admin dashboard (Ant Design), and Redux Toolkit for client state.

## Stack

- **Next.js** (App Router, ISR caching for public content)
- **PostgreSQL** + **Prisma**
- **Tailwind CSS** (public site) + **Ant Design** (admin)
- **Redux Toolkit** (quote form + content hydration)
- **Zod** validation on API routes

## Quick start

### 1. PostgreSQL

Create a database and copy the example env file:

```bash
cp .env.example .env
```

Set `DATABASE_URL` in `.env`, for example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/keytogo?schema=public"
```

### 2. Admin credentials

Set in `.env` (never commit this file):

```
ADMIN_EMAIL="admin@keytogo.com"
ADMIN_PASSWORD="your-password"
AUTH_SECRET="your-long-random-string-at-least-32-characters"
```

Sign in at `/dashboard/login` with that email and password.

### 3. Database schema + one-time seed

The seed script loads all KeyTOGO content from the concept note (services, expertise, vision/mission, transport, staffing, etc.):

```bash
npm run db:setup
```

Or separately:

```bash
npm run db:push
npm run db:seed
```

**Re-running the seed clears and replaces marketing content.** Quote requests are deleted on re-seed.

### 4. Run locally

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login)

## Admin dashboard

Designed for non-technical users:

- **Site settings** — hero text, intro, contact, SEO
- **Statistics** — homepage numbers
- **Services** — categories and service cards
- **Expertise** — industry verticals
- **Vision & Mission** — pillar statements
- **Why choose us** — benefit cards
- **Offices** — locations
- **Quote requests** — contact form submissions

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:seed` | One-time / reset content seed |
| `npm run db:setup` | Push schema + seed |

## Design

Public UI follows a clean teal/slate corporate style (inspired by modern IT agency layouts). Content is fully editable via the admin panel after the initial seed.
