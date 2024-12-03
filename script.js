// Состояние калькулятора
const calculatorState = {
    firstNumber: '',
    secondNumber: '',
    operator: '',
    isSecondNumber: false
};

const display = document.getElementById('display');
const history = []; // История операций

// Добавление числа
function appendNumber(num) {
    if (calculatorState.isSecondNumber) {
        calculatorState.secondNumber += num;
        display.value = calculatorState.secondNumber;
    } else {
        calculatorState.firstNumber += num;
        display.value = calculatorState.firstNumber;
    }
}

// Установка оператора
function setOperator(operator) {
    if (!calculatorState.firstNumber) {
        alert('Enter a number first!');
        return;
    }
    calculatorState.operator = operator;
    calculatorState.isSecondNumber = true;
    display.value = '';
}

// Вычисление результата
function calculate() {
    const num1 = parseFloat(calculatorState.firstNumber);
    const num2 = parseFloat(calculatorState.secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
        alert('Invalid input!');
        return;
    }

    let result;
    switch (calculatorState.operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert('Division by zero is not allowed!');
                clearDisplay();
                return;
            }
            result = num1 / num2;
            break;
        default:
            alert('No operator selected!');
            return;
    }

    display.value = result;
    addHistory(`${num1} ${calculatorState.operator} ${num2}`, result);
    calculatorState.firstNumber = result.toString();
    calculatorState.secondNumber = '';
    calculatorState.operator = '';
    calculatorState.isSecondNumber = false;
}

// Добавление операции в историю
function addHistory(operation, result) {
    const entry = `${operation} = ${result}`;
    history.push(entry);

    if (history.length > 5) {
        history.shift(); // Ограничиваем до 5 записей
    }

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Очистка дисплея
function clearDisplay() {
    calculatorState.firstNumber = '';
    calculatorState.secondNumber = '';
    calculatorState.operator = '';
    calculatorState.isSecondNumber = false;
    display.value = '';
}

// Квадратный корень
function calculateSquareRoot() {
    if (!calculatorState.firstNumber) {
        alert('Enter a number first!');
        return;
    }

    const num = parseFloat(calculatorState.firstNumber);
    if (num < 0) {
        alert('Cannot calculate the square root of a negative number!');
        return;
    }

    const result = Math.sqrt(num);
    display.value = result;
    addHistory(`√${num}`, result);
    calculatorState.firstNumber = result.toString();
}

// Вычисление процентов
function calculatePercentage() {
    if (!calculatorState.firstNumber) {
        alert('Enter a number first!');
        return;
    }

    const num = parseFloat(calculatorState.firstNumber);
    const result = num / 100;
    display.value = result;
    addHistory(`${num}%`, result);
    calculatorState.firstNumber = result.toString();
}
