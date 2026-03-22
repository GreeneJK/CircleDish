# Circle Dish Frontend

Next.js application for Circle Dish recipe sharing platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
frontend/
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # React components
│   └── styles/       # Global styles and design system
├── lib/              # Utility functions and API client
└── public/           # Static assets
```

## Design System

Circle Dish uses a **Professional Minimalist** design system:

- **Primary Color**: #1e3d58 (Navy)
- **Surface Colors**: #e8eef1, #43b0f1
- **Kitchen Accents**: Sage green, Terracotta, Slate
- **Typography**: Playfair Display (headings), Inter (body)
- **Layout**: Bento Box grid system with generous whitespace

## API Integration

The frontend communicates with the backend API using the `lib/api.ts` client:

```typescript
import { healthCheck, getCircles, getRecipes } from '@/lib/api';

// Check API health
const { data, error } = await healthCheck();
```

## Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. Set Root Directory to `frontend/`
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` - Your Railway backend URL
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
4. Deploy!

Vercel will automatically detect Next.js and configure the build.

## Environment Variables

See `.env.example` for all required environment variables.
