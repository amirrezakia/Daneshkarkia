document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const tableContainer = document.getElementById('tableContainer');

    generateBtn.addEventListener('click', function() {
        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);

        if (rows > 0 && cols > 0) {
            generateTable(rows, cols);
        }
    });

    function generateTable(rows, cols) {
        // Clear previous table
        tableContainer.innerHTML = '';

        // Create table element
        const table = document.createElement('table');

        // Generate table rows and cells
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                cell.textContent = `${i + 1},${j + 1}`;
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        // Add table to container
        tableContainer.appendChild(table);
    }
});