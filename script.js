const display = document.querySelector('p');
const clearBtn = document.querySelector('.clear');
const buttons = document.querySelectorAll('button');
let newNumber = true;

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    return first/second;
}

const operators = ['+', '-', '*', '/'];
const operation = [];

function operate(operator, firstNum, secondNum) {
    let output = 0;
    console.log(output);
    switch(operator) {
        case '+':
            output = add(firstNum, secondNum);
            break;
        case '-':
            output = subtract(firstNum, secondNum);
            break;
        case '*':
            output = multiply(firstNum, secondNum);
            break;
        case '/':
            output = Math.round(divide(firstNum, secondNum) * 10000000000000)/10000000000000;
            if(output < 0) {
                output = Math.round(divide(firstNum, secondNum) * 1000000000000)/1000000000000;
            }
            break;
        default:
            alert('error');
    }
    if(output.toString().length > 15) {
        console.log(output);
        console.log(output.toString().length);
        return 'NaN';
    }
    console.log(output, output.length);
    return output;
}

function clear() {
    display.textContent = '0';
    operation.length = 0;
}

clearBtn.addEventListener('click', clear);

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.value == 'clear') {
            clear();
        }
        else if(operators.includes(btn.value)) {
            if(operation.length == 0) {
                operation.push(parseInt(display.textContent));
                operation.push(btn.value);
                newNumber = false;
            } else if(operation.length == 2) {
                if(newNumber == false) {
                    operation.pop();
                    operation.push(btn.value);
                    newNumber = false;
                } else {
                    display.textContent = operate(operation[1], operation[0], parseInt(display.textContent));
                    operation.length = 0;
                    if(display.textContent != 'NaN') {
                        operation.push(parseInt(display.textContent));
                        operation.push(btn.value);
                    }
                    newNumber = false;
                }
            }
        }
        else if(btn.value == '=') {
            if(operation.length == 2 && newNumber) {
                display.textContent = operate(operation[1], operation[0], parseInt(display.textContent));
                operation.length = 0;
                newNumber = false;
            }
        }
        else if(btn.value == 'back') {
            if(newNumber) {
                if(display.textContent.length > 1) {
                    display.textContent = display.textContent.slice(0, -1);
                } else {
                    display.textContent = '0';
                }
            }
        }
        else {
            if(!newNumber) {
                display.textContent = btn.value;
                newNumber = true;
            }
            else {
                if(display.textContent.length < 15) {
                    if(display.textContent == '0') {
                        display.textContent = btn.value;
                    } else {
                        display.textContent = display.textContent + btn.value;
                    }
                    newNumber = true;
                }
            }
        }
    })
})