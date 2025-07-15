# Tonely Landing Page

Landing page for Tonely - an experimental Apple Watch app for musical pitch recognition training through haptics.

## Features

- Responsive landing page with haptic feedback animations
- Email list signup with MongoDB Atlas integration
- Real-time visual feedback for form submissions
- Duplicate email prevention
- Analytics tracking

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up MongoDB Atlas

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button

### 3. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tonely?retryWrites=true&w=majority
PORT=3000
```

### 4. Run the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

- `POST /api/signup` - Submit email for signup
- `GET /api/stats` - Get email count statistics

## Email Storage

Emails are stored in MongoDB with the following structure:
```json
{
  "email": "user@example.com",
  "signupDate": "2023-12-07T10:30:00.000Z",
  "source": "landing_page"
}
```

## Deployment

This can be deployed to any Node.js hosting platform like:
- Vercel
- Netlify Functions
- Railway
- Heroku
- DigitalOcean App Platform

Make sure to set your `MONGODB_URI` environment variable in your deployment platform.