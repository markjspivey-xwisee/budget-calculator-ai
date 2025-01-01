const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const anthropic = new Anthropic({
    apiKey: 'sk-ant-api03-6DfHt42_XxwZgZaHpXydyA8YeYOvKJ8xJkKTFHUWHBL1lzQPrQSoYVRYEGqkWDw5H4RJRLTQzh5eiAG0h_ZQYA-uZXFQQAA'
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

        const message = await anthropic.messages.create({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 400,
            messages: [{ role: 'user', content: prompt }]
        });

        res.json({ insights: message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate insights' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
