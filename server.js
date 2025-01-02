import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
}

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/insights', async (req, res) => {
    try {
        const { income, expenses, categories } = req.body;

        const prompt = `As a financial advisor, analyze this budget data and provide personalized insights and recommendations:

Income Sources:
${income.map(i => `- ${i.description}: $${i.amount}`).join('\n')}

Expenses by Category:
${expenses.map(e => `- ${e.description}: $${e.amount}`).join('\n')}

Total Income: $${income.reduce((sum, i) => sum + i.amount, 0)}
Total Expenses: $${expenses.reduce((sum, e) => sum + e.amount, 0)}
Remaining Balance: $${income.reduce((sum, i) => sum + i.amount, 0) - expenses.reduce((sum, e) => sum + e.amount, 0)}

Provide 3-4 specific, actionable insights and recommendations based on:
1. Spending patterns and potential areas for savings
2. Income diversification opportunities
3. Financial health indicators
4. Budget optimization strategies

Format each insight as a bullet point starting with "•" and keep the total response under 400 characters.`;

        console.log('Sending prompt to Claude:', prompt);
        const message = await anthropic.messages.create({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 400,
            messages: [{ role: 'user', content: prompt }]
        });

        console.log('Claude response:', JSON.stringify(message, null, 2));
        
        // Handle the response structure correctly
        if (message && message.content && Array.isArray(message.content)) {
            const content = message.content[0];
            if (content && typeof content === 'object' && content.text) {
                const insights = content.text;
                console.log('Extracted insights:', insights);
                res.json({ insights });
            } else {
                console.error('Invalid content structure:', content);
                res.status(500).json({ 
                    error: 'Invalid content structure in AI response',
                    details: { content, fullMessage: message }
                });
            }
        } else {
            console.error('Invalid message structure:', message);
            res.status(500).json({ 
                error: 'Invalid message structure from AI service',
                details: message
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate insights' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
