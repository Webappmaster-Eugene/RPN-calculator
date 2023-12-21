const stack = [];
let currentNum = '';

function enterNumber() {
  if (currentNum === '' || currentNum === '.') return;
  stack.push(parseFloat(currentNum));
  document.getElementById('output').textContent = '';
  let string = '';
  for (let i = 0; i < stack.length; i += 1) {
    string += `${stack[i]} `;
  }
  document.getElementById('stack').textContent = string;
  currentNum = '';
}

function pushNumber(number) {
  currentNum += number;
  document.getElementById('output').textContent = `${currentNum}`;
}

function removeLastDigit() {
  let str = '';
  for (let i = 0; i < currentNum.length - 1; i += 1) {
    str += currentNum[i];
  }
  currentNum = str;
  document.getElementById('output').textContent = `${currentNum}`;
}

function turnNumber() {
  if (Number(currentNum) > 0) {
    currentNum = (`-${currentNum}`);
  } else if (Number(currentNum) < 0) {
    currentNum = (`${Math.abs(currentNum)}`);
  }
  document.getElementById('output').textContent = `${currentNum}`;
}

function calculate(operand) {
  if (stack.length < 2) {
    alert('not enough operands');
    return;
  }
  const operands = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
  };
  const right = stack.pop();
  const left = stack.pop();
  const result = operands[operand](parseFloat(left), parseFloat(right));
  stack.push(parseFloat(result));
  let string = '';
  for (let i = 0; i < stack.length; i += 1) {
    string += `${stack[i]} `;
  }
  document.getElementById('stack').textContent = string;
}

function clear(fullClear) {
  if (fullClear) {
    document.getElementById('stack').textContent = '';
    while (stack.length !== 0) {
      stack.pop();
    }
  }
  document.getElementById('output').textContent = '';
  currentNum = '';
}

document.getElementById('clear').addEventListener('click', () => clear(false));
document.getElementById('clear-all').addEventListener('click', () => clear(true));
document.getElementById('enter').addEventListener('click', enterNumber);

window.addEventListener('keyup', (event) => {
  if (event.isComposing) {
    return;
  }

  const keyMap = {
    '+': () => calculate('+'),
    '-': () => calculate('-'),
    '/': () => calculate('/'),
    '*': () => calculate('*'),
    'Enter': () => enterNumber(),
    'Backspace': () => removeLastDigit(),
    '.': () => pushNumber('.'),
  };

  if (event.key >= 0 && event.key <= 9) {
    pushNumber(event.key);
  } else if (event.key in keyMap) {
    keyMap[event.key]();
  }
}, true);

document.getElementById('turn').addEventListener('click', turnNumber);
