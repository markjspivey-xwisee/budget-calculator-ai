// Generate random amount between min and max
function randomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Default expenses data with randomized amounts
const defaultExpenses = [
    { description: "Netflix & Gaming", amount: randomAmount(15, 50) },
    { description: "Apartment Rent", amount: randomAmount(800, 2000) },
    { description: "Pet Supplies", amount: randomAmount(30, 100) },
    { description: "Internet & Cable", amount: randomAmount(60, 120) },
    { description: "Phone Bill", amount: randomAmount(40, 90) },
    { description: "Electricity", amount: randomAmount(80, 200) },
    { description: "Groceries", amount: randomAmount(300, 600) },
    { description: "Restaurant Dining", amount: randomAmount(100, 400) },
    { description: "Gym & Fitness", amount: randomAmount(30, 80) },
    { description: "Car Insurance", amount: randomAmount(80, 200) },
    { description: "Gas & Fuel", amount: randomAmount(100, 300) },
    { description: "Shopping & Hobbies", amount: randomAmount(50, 200) }
];

// Sample income data with randomized amounts
const sampleIncome = [
    { description: "Software Developer Job", amount: randomAmount(4000, 8000) },
    { description: "Freelance Work", amount: randomAmount(500, 2000) },
    { description: "YouTube Channel", amount: randomAmount(100, 1000) }
];

// Note: The financial insights system uses predefined thresholds and ratios
// to generate recommendations. It's currently template-based but could be
// enhanced with AI integration using services like OpenAI's API to provide
// more personalized insights based on spending patterns and financial goals.

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load default expenses
    defaultExpenses.forEach(expense => {
        addExpenseToTable(expense.description, expense.amount);
    });
    
    // Load sample income
    sampleIncome.forEach(income => {
        addIncomeToTable(income.description, income.amount);
    });
    
    updateTotals();
});

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add income to the table
function addIncome() {
    const description = document.getElementById('income-desc').value;
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (description && amount > 0) {
        addIncomeToTable(description, amount);
        document.getElementById('income-desc').value = '';
        document.getElementById('income-amount').value = '';
        updateTotals();
    } else {
        alert('Please enter valid description and amount');
    }
}

// Add expense to the table
function addExpense() {
    const description = document.getElementById('expense-desc').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description && amount > 0) {
        addExpenseToTable(description, amount);
        document.getElementById('expense-desc').value = '';
        document.getElementById('expense-amount').value = '';
        updateTotals();
    } else {
        alert('Please enter valid description and amount');
    }
}

// Add income entry to table
function addIncomeToTable(description, amount) {
    const tbody = document.querySelector('#income-list tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${formatCurrency(amount)}</td>
        <td><button class="delete-btn" onclick="this.closest('tr').remove(); updateTotals();">Delete</button></td>
    `;
    tbody.appendChild(row);
}

// Add expense entry to table
function addExpenseToTable(description, amount) {
    const tbody = document.querySelector('#expense-list tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${formatCurrency(amount)}</td>
        <td><button class="delete-btn" onclick="this.closest('tr').remove(); updateTotals();">Delete</button></td>
    `;
    tbody.appendChild(row);
}

// Calculate totals and update display
function updateTotals() {
    const totalIncome = calculateTotal('#income-list');
    const totalExpenses = calculateTotal('#expense-list');
    const remainingBalance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('remaining-balance').textContent = formatCurrency(remainingBalance);

    updateInsights(totalIncome, totalExpenses, remainingBalance);
}

// Calculate total from a table
function calculateTotal(tableId) {
    let total = 0;
    const rows = document.querySelectorAll(`${tableId} tbody tr`);
    rows.forEach(row => {
        const amountText = row.cells[1].textContent;
        const amount = parseFloat(amountText.replace(/[$,]/g, ''));
        total += amount;
    });
    return total;
}

// Generate and update financial insights using Claude AI
async function updateInsights(totalIncome, totalExpenses, remainingBalance) {
    try {
        // Get all income entries
        const incomeRows = Array.from(document.querySelectorAll('#income-list tbody tr'));
        const income = incomeRows.map(row => ({
            description: row.cells[0].textContent,
            amount: parseFloat(row.cells[1].textContent.replace(/[$,]/g, ''))
        }));

        // Get all expense entries
        const expenseRows = Array.from(document.querySelectorAll('#expense-list tbody tr'));
        const expenses = expenseRows.map(row => ({
            description: row.cells[0].textContent,
            amount: parseFloat(row.cells[1].textContent.replace(/[$,]/g, ''))
        }));

        // Call the server endpoint for AI insights
        const apiUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api/insights'
            : '/api/insights';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ income, expenses })
        });

        if (!response.ok) {
            throw new Error('Failed to get AI insights');
        }

        const data = await response.json();
        
        // Update insights display with AI-generated content
        document.getElementById('insights').innerHTML = data.insights;
    } catch (error) {
        console.error('Error getting AI insights:', error);
        document.getElementById('insights').innerHTML = '• Error getting AI insights. Please try again later.';
    }
}
