const result = document.getElementById('result');
let is_calc = false;

function appendNumber(val) {
  if (is_calc) {
    result.value = "0";
    is_calc = false;
  }

  const currentNumber = result.value.split(/[\+\-\*\/]/).pop();
  if (val === "." && currentNumber.includes(".")) return;

  if (result.value === "0" && val !== ".") {
    result.value = val;
  } else {
    result.value += val;
  }
}

function appendOperator(op) {
  if (is_calc) is_calc = false;
  const last = result.value.slice(-1);
  if (["+", "-", "*", "/"].includes(last)) {
    result.value = result.value.slice(0, -1) + op;
  } else {
    result.value += op;
  }
}

function calculate() {
  const last = result.value.slice(-1);
  if (["+", "-", "*", "/"].includes(last)) {
    result.value = result.value.slice(0, -1);
  }
  try {
    const temp = Function('"use strict";return (' + result.value + ')')();
    if (temp === Infinity || Number.isNaN(temp)) {
      result.value = "Error";
    } else {
      result.value = temp;
    }
    is_calc = true;
  } catch {
    result.value = "Error";
    is_calc = true;
  }
}

function clearAll() {
  result.value = "0";
  is_calc = false;
}

document.querySelectorAll('.number').forEach(btn => {
  btn.addEventListener('click', () => appendNumber(btn.innerText));
});

document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', () => appendOperator(btn.innerText));
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
