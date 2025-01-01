# AI-Powered Budget Calculator

An interactive budget calculator with real-time AI insights powered by Claude 3 Sonnet. This application helps you manage your income and expenses while providing personalized financial recommendations.

## Features

- Add and track multiple income sources
- Manage various expenses with pre-populated categories
- Real-time calculations of remaining balance
- AI-powered financial insights and recommendations using Claude 3 Sonnet
- Mobile-responsive design

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Anthropic Claude 3 Sonnet API
- Deployment: Heroku

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## Environment Variables

The following environment variables are required:
- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI

## Deployment

This application is configured for Heroku deployment:

1. Create a new Heroku app
2. Add the Anthropic API key to your Heroku config vars:
```bash
heroku config:set ANTHROPIC_API_KEY=your_api_key
```
3. Deploy using Heroku Git:
```bash
git push heroku master
```

## License

MIT
