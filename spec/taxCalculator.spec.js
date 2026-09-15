/**
 * Jasmine Unit Tests for Tax Calculator Module
 * Contains exactly 7 test specifications verifying core tax calculation logic.
 */

const {
    calculateTax,
    computeProgressiveTax,
    getStandardDeduction
} = require('../taxCalculator');

describe('Tax Calculator Suite', () => {

    // Spec 1
    it('should return 0 tax when gross income is 0', () => {
        const result = calculateTax(0, 'single');
        expect(result.totalTax).toBe(0);
        expect(result.taxableIncome).toBe(0);
        expect(result.effectiveRate).toBe(0);
        expect(result.netIncome).toBe(0);
    });

    // Spec 2
    it('should return 0 tax when income is below standard deduction', () => {
        const result = calculateTax(10000, 'single');
        expect(result.taxableIncome).toBe(0);
        expect(result.totalTax).toBe(0);
        expect(result.netIncome).toBe(10000);
        expect(result.effectiveRate).toBe(0);
    });

    // Spec 3
    it('should calculate 10% tax for taxable income within the first bracket', () => {
        const progressive = computeProgressiveTax(5000);
        expect(progressive.totalTax).toBe(500);
        expect(progressive.breakdown.length).toBe(1);
        expect(progressive.breakdown[0].ratePercent).toBe('10%');
        expect(progressive.breakdown[0].taxAmount).toBe(500);
    });

    // Spec 4
    it('should correctly calculate progressive tax spanning multiple brackets', () => {
        const progressive = computeProgressiveTax(50000);
        expect(progressive.totalTax).toBe(6053);
        expect(progressive.breakdown.length).toBe(3);
    });

    // Spec 5
    it('should correctly calculate full tax result with standard deduction applied', () => {
        const result = calculateTax(64600, 'single');
        expect(result.grossIncome).toBe(64600);
        expect(result.taxableIncome).toBe(50000);
        expect(result.totalTax).toBe(6053);
        expect(result.netIncome).toBe(58547);
        expect(result.effectiveRate).toBeCloseTo(9.37, 1);
    });

    // Spec 6
    it('should apply higher standard deduction for married filing jointly', () => {
        const deductionMarried = getStandardDeduction('married_jointly');
        expect(deductionMarried).toBe(29200);

        const result = calculateTax(40000, 'married_jointly');
        expect(result.taxableIncome).toBe(10800);
        expect(result.totalTax).toBe(1080);
    });

    // Spec 7
    it('should apply custom deductions and decrease taxable income', () => {
        const withoutCustom = calculateTax(50000, 'single', 0);
        const withCustom = calculateTax(50000, 'single', 5000);

        expect(withCustom.taxableIncome).toBe(withoutCustom.taxableIncome - 5000);
        expect(withCustom.totalTax).toBeLessThan(withoutCustom.totalTax);
    });

});
