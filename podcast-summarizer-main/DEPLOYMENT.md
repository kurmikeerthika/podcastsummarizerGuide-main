# Podcast Summarizer - Deployment Guide

This guide covers deploying the Podcast Summarizer project to Heroku with a full React front-end and Flask backend.

## Prerequisites

- Heroku CLI installed ([download](https://devcenter.heroku.com/articles/heroku-cli))
- Git installed
- GitHub account
- OpenAI API key
- Docker installed (for local testing)

## Local Setup

### 1. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies for React
cd frontend
npm install
cd ..
```

### 2. Build React App

```bash
cd frontend
npm run build
cd ..
```

### 3. Run Locally

```bash
# Option 1: Using Flask
python app.py

# Option 2: Using Docker
docker-compose up
```

The app will be available at `http://localhost:5000`

## Heroku Deployment

### Step 1: Create Heroku App

```bash
heroku login
heroku create your-app-name
```

### Step 2: Set Environment Variables

```bash
heroku config:set OPENAI_API_KEY=your_openai_api_key_here
heroku config:set FLASK_ENV=production
```

### Step 3: Deploy Using Docker

```bash
# Login to Heroku Container Registry
heroku container:login

# Build and push the Docker image
heroku container:push web

# Release the app
heroku container:release web
```

### Step 4: Monitor Logs

```bash
heroku logs --tail
```

### Step 5: Open Your App

```bash
heroku open
```

## Alternative: Deploy Using Git

If you prefer Git-based deployment instead of Docker:

```bash
# Add Heroku as a remote
heroku git:remote -a your-app-name

# Push to Heroku
git push heroku main
```

## Project Structure

```
podcast-summarizer/
├── app.py                 # Flask backend
├── podcast_frontend.py    # Streamlit app (alternative UI)
├── requirements.txt       # Python dependencies
├── Procfile              # Heroku process configuration
├── runtime.txt           # Python version
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Local Docker compose
├── Dockerfile            # Dockerfile for Heroku
└── frontend/             # React app
    ├── package.json
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── components/
    │   └── index.js
    └── build/            # Built React app (generated)
```

## API Endpoints

### Get All Podcasts
```
GET /api/podcasts
```

### Get Specific Podcast
```
GET /api/podcast/<podcast_title>
```

### Transcribe New Podcast
```
POST /api/transcribe
Content-Type: application/json

{
  "rss_url": "https://example.com/feed.xml"
}
```

### Summarize Podcast
```
POST /api/summarize
Content-Type: application/json

{
  "transcription": "podcast transcription text..."
}
```

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `FLASK_ENV` - Flask environment (development/production)
- `DEBUG` - Enable debug mode (false in production)
- `PORT` - Port to run on (default: 5000)

## Troubleshooting

### "Procfile not found"
Make sure `Procfile` is in the root directory and committed to git.

### "Python version mismatch"
Update `runtime.txt` to match your Python version:
```
python-3.11.7
```

### "React app not loading"
Ensure the React app is built:
```bash
cd frontend
npm run build
cd ..
```

### "OpenAI API errors"
- Verify your API key is set correctly
- Check your OpenAI account has available credits
- Make sure the API key is current

### "Module not found errors"
Reinstall dependencies:
```bash
pip install -r requirements.txt --force-reinstall
```

## Performance Optimization

### For Production:
1. Enable caching in the Flask app
2. Use CDN for static assets
3. Set up database for scalability
4. Use background jobs for long transcriptions

### Recommended: Add Celery for async tasks
```bash
pip install celery redis
```

## Security Best Practices

1. Never commit `.env` files with secrets
2. Use environment variables for all sensitive data
3. Enable HTTPS (automatic with Heroku)
4. Regularly update dependencies
5. Use strong API key access controls

## Scaling Recommendations

- Start with Heroku hobby dyno
- Scale to standard dyno if needed
- Consider Heroku Postgres for data persistence
- Use Heroku Redis for caching and background jobs

## Support

For issues or questions:
- Check Heroku documentation: https://devcenter.heroku.com
- OpenAI API docs: https://platform.openai.com/docs
- React documentation: https://react.dev

## License

See LICENSE file for details.
