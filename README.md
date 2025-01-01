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

### Option 1: Azure Web App Deployment

1. Create a new Azure Web App:
   ```bash
   az webapp create --resource-group YourResourceGroup --plan YourServicePlan --name your-app-name --runtime "NODE|18-lts"
   ```

2. Configure environment variables in Azure:
   ```bash
   az webapp config appsettings set --name your-app-name --resource-group YourResourceGroup --settings ANTHROPIC_API_KEY="your_api_key"
   ```

3. Deploy using Azure CLI:
   ```bash
   az webapp deployment source config-local-git --name your-app-name --resource-group YourResourceGroup
   git remote add azure <url_from_previous_command>
   git push azure master
   ```

Alternatively, you can deploy directly from Visual Studio:
1. Open the project in Visual Studio
2. Right-click on the project in Solution Explorer
3. Select "Publish"
4. Choose "Azure" as the target
5. Follow the wizard to configure your Azure Web App
6. Click "Publish"

Remember to configure the environment variable `ANTHROPIC_API_KEY` in the Azure Portal under Configuration > Application Settings.

### Option 2: Local Deployment

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
set ANTHROPIC_API_KEY=your_api_key  # Windows
# or
export ANTHROPIC_API_KEY=your_api_key  # Linux/Mac
```

3. Start the server:
```bash
npm start
```

The application will be available at http://localhost:3000

## License

MIT
