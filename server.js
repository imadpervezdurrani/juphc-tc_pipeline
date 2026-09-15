const express = require('express');
const cors = require('cors');
const path = require('path');
const { calculateTax, getTaxBrackets, STANDARD_DEDUCTIONS } = require('./taxCalculator');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Health Check Endpoint (used by Kubernetes / IBM Cloud probes)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        service: 'Tax-Calculator-App',
        version: '1.0.0'
    });
});

// Calculate Tax API
app.post('/api/calculate', (req, res) => {
    try {
        const { grossIncome, filingStatus, customDeductions } = req.body;

        const income = parseFloat(grossIncome);
        const deductions = customDeductions ? parseFloat(customDeductions) : 0;
        const status = filingStatus || 'single';

        if (isNaN(income)) {
            return res.status(400).json({ error: 'Gross income must be a valid number' });
        }

        if (income < 0) {
            return res.status(400).json({ error: 'Gross income cannot be negative' });
        }

        const calculation = calculateTax(income, status, deductions);
        return res.status(200).json({
            success: true,
            data: calculation
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message || 'Internal server error during calculation'
        });
    }
});

// Tax Brackets and Deductions Metadata API
app.get('/api/brackets', (req, res) => {
    res.status(200).json({
        success: true,
        brackets: getTaxBrackets(),
        standardDeductions: STANDARD_DEDUCTIONS
    });
});

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Tax Calculator Application running on port ${PORT}`);
        console.log(`Health check available at http://localhost:${PORT}/health`);
    });
}

module.exports = app;
