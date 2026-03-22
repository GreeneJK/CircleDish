# Circle Dish Backend API

Flask-based REST API for Circle Dish recipe sharing platform.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Run the development server:
```bash
python app.py
```

The API will be available at `http://localhost:5001`

## API Endpoints

### Health Check
- `GET /health` - Returns API health status

### Circles (Coming Soon)
- `GET /api/v1/circles` - List all circles for authenticated user
- `POST /api/v1/circles` - Create a new circle
- `GET /api/v1/circles/:id` - Get circle details
- `PUT /api/v1/circles/:id` - Update circle
- `DELETE /api/v1/circles/:id` - Delete circle

### Recipes (Coming Soon)
- `GET /api/v1/recipes` - List all recipes
- `POST /api/v1/recipes` - Create a new recipe
- `GET /api/v1/recipes/:id` - Get recipe details
- `PUT /api/v1/recipes/:id` - Update recipe
- `DELETE /api/v1/recipes/:id` - Delete recipe

## Deployment to Railway

1. Connect your GitHub repository to Railway
2. Set Root Directory to `backend/`
3. Configure environment variables in Railway dashboard
4. Railway will automatically detect Python and use `Procfile`

## Environment Variables

See `.env.example` for required environment variables.
