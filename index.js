// BASE VARIABLES
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const displayUpper = document.querySelector('.display-upper');
const displayLower = document.querySelector('.display-lower');
const equalsButton = document.querySelector('.equals');
const clearAllButton = document.querySelector('.clear-all');
const deleteButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const operators = ['+', '-', '*', '/'];

let lastAction = 'operatorSelect';
let operatorInput = '';
let numberInput = '';
displayLower.textContent = numberInput;
displayUpper.textContent = '';

// ADD
const add = function (firstInput, secondInput) {
    return Number(firstInput) + Number(secondInput);
};

// SUBTRACT
const subtract = function (firstInput, secondInput) {
    return Number(firstInput) - Number(secondInput);
};

// MULTIPLY
const multiply = function (firstInput, secondInput) {
    return Number(firstInput) * Number(secondInput);
};

// DIVIDE
const divide = function (firstInput, secondInput) {
    return Number(firstInput) / Number(secondInput);
};

// CALCULATE
const calculate = function (firstNumber, operator, secondNumber) {
    if (operatorInput === '/' && secondNumber === 0) {
        displayLower.textContent = 'YOU SHALL NOT PASS!';
    } else if (operator === '+') {
        displayLower.textContent =
            Math.round((add(firstNumber, secondNumber))
                * 1000000) / 1000000;
    } else if (operator === '-') {
        displayLower.textContent =
            Math.round((subtract(firstNumber, secondNumber))
                * 1000000) / 1000000;
    } else if (operator === '*') {
        displayLower.textContent =
            Math.round((multiply(firstNumber, secondNumber))
                * 1000000) / 1000000;
    } else if (operator === '/') {
        displayLower.textContent =
            Math.round((divide(firstNumber, secondNumber))
                * 1000000) / 1000000;
    }
};

// NUMBER INPUT
const userNumberInput = numberButtons.forEach(item => {
    item.addEventListener('click', () => {
        if (lastAction === 'operatorSelect') {
            lastAction = 'numberSelect'
            displayLower.textContent = '';
            displayLower.append(item.textContent);
        } else {
            displayLower.append(item.textContent);
        }
        if (displayLower.textContent.charAt(0) === '0' &&
            displayLower.textContent.charAt(1) === '0') {
            displayLower.textContent = displayLower.textContent.slice(0, 1);
        }
        if ((displayLower.textContent.charAt(0) === '0' &&
            displayLower.textContent.charAt(1) === '1')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '2')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '3')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '4')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '5')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '6')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '7')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '8')
            || (displayLower.textContent.charAt(0) === '0' &&
                displayLower.textContent.charAt(1) === '9')) {
            displayLower.textContent = displayLower.textContent.slice(1, 2);
        }
        if (displayLower.textContent.length > 19) {
            displayLower.textContent = displayLower.textContent.slice(0, 19);
        }
    })
});

// DECIMAL EVENT LISTENER
decimalButton.addEventListener('click', () => {
    if (lastAction === 'operatorSelect') {
        displayLower.textContent = '';
    }
    if (displayLower.textContent.includes('.')) {
        // do nothing
    } else {
        displayLower.append('.');
        lastAction = 'numberSelect'
    }
});

// OPERATOR INPUT
const userOperatorInput = operatorButtons.forEach(item => {
    item.addEventListener('click', () => {
        lastAction = 'operatorSelect';
        if (operators.some(operator =>
            displayUpper.textContent.includes(operator))) {
            calculate(numberInput, operatorInput, displayLower.textContent);
            numberInput = Number(displayLower.textContent);
            displayUpper.textContent = Number(displayLower.textContent);
            displayLower.textContent = 0;
            operatorInput = item.textContent;
            displayUpper.append(item.textContent);
        } else {
            numberInput = Number(displayLower.textContent);
            operatorInput = item.textContent;
            displayLower.textContent = '';
            displayUpper.append(numberInput + item.textContent);
        }
    })
});

// EQUALS BUTTON
equalsButton.addEventListener('click', () => {
    lastAction = 'operatorSelect';
    displayUpper.textContent = '';
    calculate(numberInput, operatorInput, Number(displayLower.textContent));
});

// CLEAR ALL
clearAllButton.addEventListener('click', () => {
    lastAction = 'operatorSelect';
    operatorInput = '';
    numberInput = '';
    displayLower.textContent = numberInput;
    displayUpper.textContent = '';
});

// DELETE PREVIOUS
deleteButton.addEventListener('click', () => {
    if (lastAction === 'numberSelect') {
        displayLower.textContent = displayLower.textContent.slice(0, -1);
    }
});

// KEYBOARD SUPPORT
document.addEventListener('keydown', function (e) {
    calculatorKeyboard(e.key)
});

function calculatorKeyboard(key) {
    switch (key) {
        case "0":
            document.querySelector('.zero').click();
            break;

        case "1":
            document.querySelector('.one').click();
            break;

        case "2":
            document.querySelector('.two').click();
            break;

        case "3":
            document.querySelector('.three').click();
            break;

        case "4":
            document.querySelector('.four').click();
            break;

        case "5":
            document.querySelector('.five').click();
            break;

        case "6":
            document.querySelector('.six').click();
            break;

        case "7":
            document.querySelector('.seven').click();
            break;

        case "8":
            document.querySelector('.eight').click();
            break;

        case "9":
            document.querySelector('.nine').click();
            break;

        case ".":
            document.querySelector('.decimal').click();
            break;

        case "Enter":
            document.querySelector('.equals').click();
            break;

        case "+":
            document.querySelector('.add').click();
            break;

        case "-":
            document.querySelector('.subtract').click();
            break;

        case "*":
            document.querySelector('.multiply').click();
            break;

        case "/":
            document.querySelector('.divide').click();
            break;

        case "Backspace":
            document.querySelector('.clear').click();
            break;

        case "Delete":
            document.querySelector('.clear-all').click();
            break;
        default: console.log("this button does nothing");
    }
}