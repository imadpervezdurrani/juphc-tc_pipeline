/**
 * Jasmine Unit Tests for Tax Calculator Module
 * Verifies core tax computations, deductions, progressive brackets, edge cases, and errors.
 */

const {
    calculateTax,
    computeProgressiveTax,
    getStandardDeduction,
    getTaxBrackets,
    STANDARD_DEDUCTIONS
} = require('../taxCalculator');

describe('Tax Calculator Suite', () => {

    describe('Basic Computations & Zero Income', () => {
        it('should return 0 tax when gross income is 0', () => {
            const result = calculateTax(0, 'single');
            expect(result.totalTax).toBe(0);
            expect(result.taxableIncome).toBe(0);
            expect(result.effectiveRate).toBe(0);
            expect(result.netIncome).toBe(0);
        });

        it('should return 0 tax when income is below standard deduction', () => {
            // Standard deduction for single is 14,600
            const result = calculateTax(10000, 'single');
            expect(result.taxableIncome).toBe(0);
            expect(result.totalTax).toBe(0);
            expect(result.netIncome).toBe(10000);
            expect(result.effectiveRate).toBe(0);
        });
    });

    describe('Progressive Tax Bracket Calculations', () => {
        it('should calculate 10% tax for taxable income within the first bracket', () => {
            // First bracket: 0 to 11,600 at 10%
            const progressive = computeProgressiveTax(5000);
            expect(progressive.totalTax).toBe(500);
            expect(progressive.breakdown.length).toBe(1);
            expect(progressive.breakdown[0].ratePercent).toBe('10%');
            expect(progressive.breakdown[0].taxAmount).toBe(500);
        });

        it('should correctly calculate progressive tax spanning multiple brackets', () => {
            // For taxable income of 50,000:
            // Bracket 1: 11,600 * 0.10 = 1,160
            // Bracket 2: (47,150 - 11,600) = 35,550 * 0.12 = 4,266
            // Bracket 3: (50,000 - 47,150) = 2,850 * 0.22 = 627
            // Expected total tax = 1,160 + 4,266 + 627 = 6,053
            const progressive = computeProgressiveTax(50000);
            expect(progressive.totalTax).toBe(6053);
            expect(progressive.breakdown.length).toBe(3);
        });

        it('should correctly calculate full tax result with standard deduction applied', () => {
            // Gross income 64,600 for Single:
            // Standard deduction = 14,600
            // Taxable income = 50,000
            // Tax = 6,053
            const result = calculateTax(64600, 'single');
            expect(result.grossIncome).toBe(64600);
            expect(result.taxableIncome).toBe(50000);
            expect(result.totalTax).toBe(6053);
            expect(result.netIncome).toBe(58547);
            expect(result.effectiveRate).toBeCloseTo(9.37, 1);
        });
    });

    describe('Filing Statuses & Custom Deductions', () => {
        it('should apply higher standard deduction for married filing jointly', () => {
            const deductionMarried = getStandardDeduction('married_jointly');
            expect(deductionMarried).toBe(29200);

            const result = calculateTax(40000, 'married_jointly');
            // Taxable = 40,000 - 29,200 = 10,800 (all in 10% bracket)
            expect(result.taxableIncome).toBe(10800);
            expect(result.totalTax).toBe(1080);
        });

        it('should apply custom deductions and decrease taxable income', () => {
            const withoutCustom = calculateTax(50000, 'single', 0);
            const withCustom = calculateTax(50000, 'single', 5000);

            expect(withCustom.taxableIncome).toBe(withoutCustom.taxableIncome - 5000);
            expect(withCustom.totalTax).toBeLessThan(withoutCustom.totalTax);
        });
    });

    describe('Validation and Error Handling', () => {
        it('should throw RangeError for negative gross income', () => {
            expect(() => {
                calculateTax(-1000, 'single');
            }).toThrowError(RangeError, 'Gross income cannot be negative');
        });

        it('should throw TypeError for invalid non-numeric income', () => {
            expect(() => {
                calculateTax('invalid_income', 'single');
            }).toThrowError(TypeError, 'Gross income must be a valid number');
        });
    });

    describe('Metadata and Tax Brackets', () => {
        it('should return valid tax brackets definition', () => {
            const brackets = getTaxBrackets();
            expect(brackets.length).toBe(7);
            expect(brackets[0].rate).toBe(0.10);
            expect(brackets[6].rate).toBe(0.37);
        });
    });

});
