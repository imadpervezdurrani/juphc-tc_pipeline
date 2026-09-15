// Client-Side Tax Calculator Controller

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tax-form');
    const grossIncomeInput = document.getElementById('gross-income');
    const filingStatusSelect = document.getElementById('filing-status');
    const customDeductionsInput = document.getElementById('custom-deductions');

    // Stats elements
    const totalTaxEl = document.getElementById('total-tax');
    const effectiveRateEl = document.getElementById('effective-rate');
    const netIncomeEl = document.getElementById('net-income');
    const taxableIncomeEl = document.getElementById('taxable-income');
    const statMarginalEl = document.getElementById('stat-marginal');
    const statMonthlyEl = document.getElementById('stat-monthly');
    const statDeductionsEl = document.getElementById('stat-deductions');
    const tableBody = document.getElementById('bracket-table-body');

    // Format currency
    const formatUSD = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    // Calculate tax via backend API or fallback client computation
    async function calculate() {
        const grossIncome = parseFloat(grossIncomeInput.value) || 0;
        const filingStatus = filingStatusSelect.value;
        const customDeductions = parseFloat(customDeductionsInput.value) || 0;

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grossIncome, filingStatus, customDeductions })
            });

            if (!response.ok) {
                throw new Error('Calculation service returned an error');
            }

            const json = await response.json();
            renderResults(json.data);
        } catch (err) {
            console.warn('Backend API unavailable, using local client calculation:', err);
            // Fallback client-side calculation if offline
            const clientResult = computeClientTax(grossIncome, filingStatus, customDeductions);
            renderResults(clientResult);
        }
    }

    function renderResults(data) {
        totalTaxEl.textContent = formatUSD(data.totalTax);
        effectiveRateEl.textContent = `${data.effectiveRate.toFixed(2)}%`;
        netIncomeEl.textContent = formatUSD(data.netIncome);
        taxableIncomeEl.textContent = formatUSD(data.taxableIncome);

        statMonthlyEl.textContent = `Monthly: ${formatUSD(data.netIncome / 12)}`;
        statDeductionsEl.textContent = `Deductions: ${formatUSD(data.totalDeductions)}`;

        // Marginal rate
        const lastBracket = data.breakdown && data.breakdown.length > 0 
            ? data.breakdown[data.breakdown.length - 1].ratePercent 
            : '0%';
        statMarginalEl.textContent = `Marginal Rate: ${lastBracket}`;

        // Render bracket breakdown table
        tableBody.innerHTML = '';
        if (data.breakdown && data.breakdown.length > 0) {
            data.breakdown.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${item.ratePercent}</strong> Bracket ($${item.min.toLocaleString()} - ${item.max === 'Above' ? 'Above' : '$' + item.max.toLocaleString()})</td>
                    <td>${formatUSD(item.taxableAmount)}</td>
                    <td><span class="badge" style="background: rgba(99,102,241,0.15);">${item.ratePercent}</span></td>
                    <td style="font-weight:600; color:#f87171;">${formatUSD(item.taxAmount)}</td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="4" style="text-align:center; color: var(--text-muted); padding: 1.5rem;">No taxable income after standard deduction. Total tax is $0.</td>`;
            tableBody.appendChild(tr);
        }
    }

    // Client fallback logic
    function computeClientTax(grossIncome, filingStatus, customDeductions) {
        const std = filingStatus === 'married_jointly' ? 29200 : (filingStatus === 'head_of_household' ? 21900 : 14600);
        const totalDeductions = std + customDeductions;
        const taxable = Math.max(0, grossIncome - totalDeductions);

        const brackets = [
            { rate: 0.10, min: 0, max: 11600 },
            { rate: 0.12, min: 11600, max: 47150 },
            { rate: 0.22, min: 47150, max: 100525 },
            { rate: 0.24, min: 100525, max: 191950 },
            { rate: 0.32, min: 191950, max: 243725 },
            { rate: 0.35, min: 243725, max: 609350 },
            { rate: 0.37, min: 609350, max: Infinity }
        ];

        let tax = 0;
        const breakdown = [];
        for (const b of brackets) {
            if (taxable > b.min) {
                const chunk = Math.min(taxable, b.max) - b.min;
                const chunkTax = chunk * b.rate;
                tax += chunkTax;
                breakdown.push({
                    rate: b.rate,
                    ratePercent: `${b.rate * 100}%`,
                    min: b.min,
                    max: b.max === Infinity ? 'Above' : b.max,
                    taxableAmount: chunk,
                    taxAmount: chunkTax
                });
            }
        }

        const effective = grossIncome > 0 ? (tax / grossIncome) * 100 : 0;
        return {
            grossIncome,
            taxableIncome: taxable,
            totalTax: Math.round(tax),
            netIncome: Math.round(grossIncome - tax),
            effectiveRate: effective,
            totalDeductions,
            breakdown
        };
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculate();
    });

    // Auto-calculate on initial load
    calculate();
});
