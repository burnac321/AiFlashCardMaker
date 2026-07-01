const TAX_RATE = 0.23;
const TAX_THRESHOLD = 70000;

const tbody = document.getElementById('tableBody');
const summaryEl = document.getElementById('summary');

let countInput = prompt('How many employees do you want to add?', '3');
if (countInput === null) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No data entered.</td></tr>`;
    summaryEl.innerHTML = `<div class="stat">Total Employees: 0</div><div class="stat">Total Tax: RWF0.00</div>`;
} else {
    let count = parseInt(countInput, 10);
    if (isNaN(count) || count < 1) {
        alert('Please enter a valid number (1 or more).');
        count = 0;
    }

    const employees = [];

    for (let i = 0; i < count; i++) {
        const index = i + 1;
        const name = prompt(`Employee #${index} — Enter name:`);
        if (name === null) break;

        const salaryInput = prompt(`Employee #${index} — Enter salary (RWF):`);
        if (salaryInput === null) break;

        const job = prompt(`Employee #${index} — Enter job title:`);
        if (job === null) break;

        const salary = parseFloat(salaryInput);
        if (isNaN(salary) || salary < 0) {
            alert('Invalid salary, skipping this employee.');
            continue;
        }

        employees.push({
            name: name.trim(),
            salary: salary,
            job: job.trim()
        });
    }

    let totalTax = 0;
    let htmlRows = '';

    if (employees.length === 0) {
        htmlRows = `<tr><td colspan="5" class="empty-state">No employees added.</td></tr>`;
    } else {
        employees.forEach((emp, idx) => {
            let tax = 0;
            if (emp.salary > TAX_THRESHOLD) {
                tax = Math.round(emp.salary * TAX_RATE * 100) / 100;
            }
            totalTax += tax;

            const taxClass = tax > 0 ? 'tax-positive' : 'tax-zero';
            const row = `<tr>
                <td>${idx + 1}</td>
                <td>${emp.name}</td>
                <td>RWF${emp.salary.toFixed(2)}</td>
                <td>${emp.job}</td>
                <td class="${taxClass}">RWF ${tax.toFixed(2)}</td>
            </tr>`;
            htmlRows += row;
        });
    }

    tbody.innerHTML = htmlRows;

    summaryEl.innerHTML = `
        <div class="stat"><span class="label">Total Employees:</span> <span>${employees.length}</span></div>
        <div class="stat"><span class="label">Total Tax Collected:</span> <span>${totalTax.toFixed(2)} RWF</span></div>
        <div class="stat"><span class="label">Tax Rate:</span> <span>${TAX_RATE * 100}% (applies above RWF ${TAX_THRESHOLD})</span></div>
    `;
}