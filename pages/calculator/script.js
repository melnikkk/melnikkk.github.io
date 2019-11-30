const btns = document.querySelector('.calc-btns');

const calc = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecOperand: false,
    operator: null
};

const performCalculation = {
    'rad': (firstOperand, secondOperand) => firstOperand ** (1/secondOperand),
    'pow': (firstOperand, secondOperand) => firstOperand ** secondOperand,
    '%': (firstOperand, secondOperand) => (firstOperand / secondOperand) * 100,
    '/': (firstOperand, secondOperand) => (firstOperand / secondOperand).toFixed(3),
    '*': (firstOperand, secondOperand) => (firstOperand * secondOperand).toFixed(3),
    '+': (firstOperand, secondOperand) => (firstOperand + secondOperand).toFixed(3),
    '-': (firstOperand, secondOperand) => (firstOperand - secondOperand).toFixed(3),
    '=': (firstOperand, secondOperand) => secondOperand
};

function reset() {
    calc.displayValue = '0';
    calc.firstOperand = null;
    calc.waitingForSecOperand = false;
    calc.operator = null;
}

function addDigit(digit) {
    const {waitingForSecOperand} = calc;
    
    if (waitingForSecOperand === true) {
        calc.displayValue = digit;
        calc.waitingForSecOperand = false;

    } else {
        if (calc.displayValue === '0') calc.displayValue = digit;
        else calc.displayValue += digit;
    } 
}

function addDecimal(decimal) {
    if (calc.waitingForSecOperand === true) return;

    if (!calc.displayValue.includes(decimal)) calc.displayValue += decimal;
}

function manageOperator(next) {
    const {firstOperand, operator, displayValue} = calc;
    const inputVal = +displayValue;

    if (operator && calc.waitingForSecOperand) {
        calc.operator = next;
        return;
    }

    if (firstOperand === null) {
        calc.firstOperand = inputVal;
    
    } else if (operator){
        const result = performCalculation[operator](firstOperand, inputVal);
    
        calc.displayValue = String(result);
        calc.firstOperand = result;    
    }

    calc.waitingForSecOperand = true;
    calc.operator = next;  
}

function showDisplayVal() {
    const display = document.querySelector('.calc-display');
    display.value = calc.displayValue;
}

btns.addEventListener('click', (event) => {
    const {target} = event;

    //everything besides the button
    if (!target.matches('button')) return;

    //work with operator
    if (target.classList.contains('operator')) {
        manageOperator(target.value);
        showDisplayVal();
        return;
    }

    //add decimal
    if (target.classList.contains('decimal')) {
        addDecimal(target.value);
        showDisplayVal();
        return;
    }

    //clear all
    if (target.classList.contains('clear')) {
        reset();
        showDisplayVal();
        return;
    }

    //add numbers
    addDigit(target.value);
    showDisplayVal();
    return; 
});

