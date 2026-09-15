/**
 * Tax Calculator Business Logic Module
 * Provides progressive tax brackets, standard deduction calculation,
 * taxable income determination, and effective tax rate calculations.
 */

// Standard Deductions by Filing Status (2024 tax year guidelines)
const STANDARD_DEDUCTIONS = {
    single: 14600,
    married_jointly: 29200,
    head_of_household: 21900
};

// Federal Progressive Tax Brackets for Single Filers
const TAX_BRACKETS_SINGLE = [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity }
];

/**
 * Calculates progressive tax based on taxable income.
 * @param {number} taxableIncome - Income subject to tax after deductions.
 * @returns {object} Object containing total tax and detailed bracket breakdown.
 */
function computeProgressiveTax(taxableIncome) {
    if (taxableIncome <= 0) {
        return { totalTax: 0, breakdown: [] };
    }

    let totalTax = 0;
    const breakdown = [];

    for (const bracket of TAX_BRACKETS_SINGLE) {
        if (taxableIncome > bracket.min) {
            const taxableInThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
            const taxForBracket = taxableInThisBracket * bracket.rate;
            totalTax += taxForBracket;

            breakdown.push({
                rate: bracket.rate,
                ratePercent: `${(bracket.rate * 100).toFixed(0)}%`,
                min: bracket.min,
                max: bracket.max === Infinity ? 'Above' : bracket.max,
                taxableAmount: Math.round(taxableInThisBracket * 100) / 100,
                taxAmount: Math.round(taxForBracket * 100) / 100
            });
        }
    }

    return {
        totalTax: Math.round(totalTax * 100) / 100,
        breakdown
    };
}

/**
 * Main tax calculator function.
 * @param {number} grossIncome - Gross annual income.
 * @param {string} filingStatus - 'single', 'married_jointly', or 'head_of_household'.
 * @param {number} customDeductions - Optional additional deductions.
 * @returns {object} Full calculation results.
 */
function calculateTax(grossIncome, filingStatus = 'single', customDeductions = 0) {
    if (typeof grossIncome !== 'number' || isNaN(grossIncome)) {
        throw new TypeError('Gross income must be a valid number');
    }

    if (grossIncome < 0) {
        throw new RangeError('Gross income cannot be negative');
    }

    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus] || STANDARD_DEDUCTIONS.single;
    const totalDeductions = standardDeduction + Math.max(0, customDeductions);
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    const { totalTax, breakdown } = computeProgressiveTax(taxableIncome);
    const effectiveRate = grossIncome > 0 ? Math.round((totalTax / grossIncome) * 10000) / 100 : 0;
    const netIncome = Math.round((grossIncome - totalTax) * 100) / 100;

    return {
        grossIncome: Math.round(grossIncome * 100) / 100,
        filingStatus,
        standardDeduction,
        customDeductions: Math.max(0, customDeductions),
        totalDeductions,
        taxableIncome: Math.round(taxableIncome * 100) / 100,
        totalTax,
        netIncome,
        effectiveRate,
        breakdown
    };
}

/**
 * Retrieves standard deduction amount for a filing status.
 */
function getStandardDeduction(status) {
    return STANDARD_DEDUCTIONS[status] || STANDARD_DEDUCTIONS.single;
}

/**
 * Retrieves current tax brackets.
 */
function getTaxBrackets() {
    return TAX_BRACKETS_SINGLE;
}

module.exports = {
    calculateTax,
    computeProgressiveTax,
    getStandardDeduction,
    getTaxBrackets,
    STANDARD_DEDUCTIONS,
    TAX_BRACKETS_SINGLE
};
