# Starfleet Budget Console 🚀

A Star Trek LCARS-inspired budget management system with AI-powered insights. This application helps Starfleet officers manage their credit allocations with an authentic LCARS interface design.

## Features

- 🖥️ LCARS-style interface with authentic Star Trek aesthetics
- 💫 Animated UI elements with photon-like glow effects
- 🤖 AI-powered Computer Analysis using Claude 3 Sonnet
- 📊 Real-time credit calculations
- 💾 Data export/import capabilities
- 🔄 Emergency data purge function

## Technology Stack

- Frontend: HTML, CSS, JavaScript with LCARS design system
- Backend: Node.js, Express
- AI: Anthropic Claude 3 Sonnet API
- Deployment: Vercel's subspace network

## Live Console

Access the console at: https://budget-calculator-25yv3amwp-markjspiveygmailcoms-projects.vercel.app

## Features

- Add and track multiple credit sources
- Manage various credit allocations
- Real-time calculations of remaining balance
- AI-powered financial insights
- Mobile-responsive design for all viewscreens
- Import/Export data to secure JSON files

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
export ANTHROPIC_API_KEY=your_api_key
```

3. Start the server:
```bash
npm start
```

4. Open http://localhost:3000 in your terminal viewer

## Environment Variables

The following environment variables are required:
- `ANTHROPIC_API_KEY`: Your Anthropic API key for Computer Analysis

## Deployment

The application is configured for deployment on Vercel:

1. Create a new Vercel project
2. Add the Anthropic API key to your Vercel environment variables
3. Deploy using Vercel CLI or GitHub integration

## Interface Design

The interface uses the official LCARS color scheme:
- Primary: #f90 (Orange/Gold)
- Secondary: #c66 (Red)
- Tertiary: #99c (Purple/Blue)
- Background: #000 (Space Black)
- Text: #fff (White)
- Accent: #fc6 (Light Orange)

## License

MIT - Starfleet Open Source Initiative
