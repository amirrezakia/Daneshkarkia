// Navigation Functions
function showExercise(exerciseId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show selected exercise
    document.getElementById(exerciseId).classList.add('active');

    // Reset forms and displays when switching exercises
    if (exerciseId === 'exercise2') {
        document.getElementById('registrationForm').reset();
        document.getElementById('message').style.display = 'none';
    }
    if (exerciseId === 'exercise3') {
        clearDisplay();
    }
}

function showMainMenu() {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show main menu
    document.getElementById('mainMenu').classList.add('active');
}

// Exercise 1: Dynamic Table Generator
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

    // Exercise 2: Form Validation
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Validate username
        if (username.length < 5) {
            showMessage('Username must be at least 5 characters long.', 'error');
            return;
        }

        // Validate password
        if (!isValidPassword(password)) {
            showMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.', 'error');
            return;
        }

        // If validation passes
        showMessage('Form submitted successfully!', 'success');
    });

    function isValidPassword(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        return hasUppercase && hasLowercase && hasNumber;
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
    }
});

// Exercise 3: Calculator Functions
let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '' && previousInput === '') return;
        if (operator !== '' && currentInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        display.value = previousInput + ' ' + value + ' ';
    } else {
        currentInput += value;
        if (operator === '') {
            display.value = currentInput;
        } else {
            display.value = previousInput + ' ' + operator + ' ' + currentInput;
        }
    }
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    result = Math.round(result * 100000000) / 100000000; // Round to avoid floating point errors
    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}

function clearDisplay() {
    if (display) {
        display.value = '';
        currentInput = '';
        operator = '';
        previousInput = '';
    }
}

function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        if (operator === '') {
            display.value = currentInput;
        } else {
            display.value = previousInput + ' ' + operator + ' ' + currentInput;
        }
    }
}