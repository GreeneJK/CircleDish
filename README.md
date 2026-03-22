# Circle Dish

A private social network for culinary heritage and recipe sharing.

## 🏗️ Architecture

Circle Dish uses a **Decoupled Monorepo** strategy:

```
CircleDish/
├── frontend/          # Next.js application (Vercel)
├── backend/           # Flask API (Railway)
├── shared/            # Shared TypeScript types
├── DEPLOYMENT.md      # Deployment checklist
└── package.json       # Root scripts for development
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ and npm
- **Python** 3.11+
- **Git**

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/CircleDish.git
cd CircleDish

# Install root dependencies (concurrently)
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment Variables

**Frontend** (`frontend/.env.local`):
```bash
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your values
```

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your values
```

### 3. Run Development Servers

**Option A: Run both services concurrently (recommended)**
```bash
npm run dev
```

**Option B: Run services separately**

Terminal 1 - Backend:
```bash
cd backend
source venv/bin/activate
python app.py
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 4. Validate Setup

1. **Backend Health Check**: Visit http://localhost:5001/health
   - Should return: `{"status": "healthy", "service": "Circle Dish API", "version": "1.0.0"}`

2. **Frontend**: Visit http://localhost:3000
   - Landing page should load

3. **API Integration Test**: Visit http://localhost:3000/test-api
   - Should show successful connection to backend

## 📁 Project Structure

### Frontend (`/frontend`)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Typography**: Playfair Display (headings) + Inter (body)
- **Deployment**: Vercel

### Backend (`/backend`)
- **Framework**: Flask with Flask-CORS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (coming soon)
- **Deployment**: Railway

### Shared (`/shared`)
- TypeScript type definitions shared between frontend and backend

## 🎨 Design System

Circle Dish uses a **Professional Minimalist** design system:

- **Primary Color**: `#1e3d58` (Navy)
- **Surface Colors**: `#e8eef1`, `#43b0f1`
- **Kitchen Accents**: Sage green, Terracotta, Slate
- **Typography**: Playfair Display (headings), Inter (body)
- **Layout**: Bento Box grid system with generous whitespace

## 🔧 Available Scripts

From the root directory:

```bash
npm run dev                 # Run both frontend and backend concurrently
npm run dev:frontend        # Run only frontend
npm run dev:backend         # Run only backend
npm run install:all         # Install all dependencies
npm run install:frontend    # Install frontend dependencies
npm run install:backend     # Install backend dependencies
npm run build:frontend      # Build frontend for production
```

## 📦 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment instructions including:

- Vercel setup for frontend
- Railway setup for backend
- Supabase configuration
- Environment variables
- CORS configuration
- Post-deployment validation

## 🗄️ Database Schema (Coming Soon)

Tables:
- `users` - User accounts
- `circles` - Private groups
- `circle_members` - Circle membership
- `recipes` - Recipe data
- `recipe_circles` - Recipe-circle associations
- `comments` - Nested comments with photos
- `invitations` - Circle invitations

## 🔐 Security

- Row Level Security (RLS) on all Supabase tables
- CORS configured for specific origins only
- Environment variables for all secrets
- HTTPS enforced in production
- Secure session management

## 🛣️ Roadmap

### Phase 1: MVP (Current)
- [x] Landing page
- [x] Design system
- [x] Monorepo architecture
- [ ] Authentication
- [ ] Circle creation
- [ ] Recipe upload

### Phase 2: Social Features
- [ ] Nested comments with photos
- [ ] Recipe sharing across circles
- [ ] Invitation system
- [ ] Print optimization

### Phase 3: Advanced Features
- [ ] AI-powered recipe tagging
- [ ] Ingredient scaling
- [ ] Kitchen assistant integration
- [ ] Mobile app

## 📚 Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC License

## 👤 Author

Jeremy Greene

## 🆘 Troubleshooting

### Backend won't start
- Ensure Python virtual environment is activated
- Check all dependencies are installed: `pip install -r requirements.txt`
- Verify port 5001 is not in use

### Frontend can't connect to backend
- Ensure backend is running on port 5001
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Verify CORS settings in `backend/.env`

### CORS errors
- Add your frontend URL to `CORS_ALLOWED_ORIGINS` in backend `.env`
- Restart backend after changing CORS settings

For more help, visit http://localhost:3000/test-api when both services are running.
