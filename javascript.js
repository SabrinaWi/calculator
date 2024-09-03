//Basic functions

function add(a, b) {
  sum = a + b;
  return sum;
}

function subtract(a, b) {
  diff = a - b;
  return diff;
}

function multiply(a, b) {
  prod = a * b;
  return prod;
}

function divide(a, b) {
  quot = a / b;
  return quot;
}

//Operation variables

let num1 = []; //1st operand, use array to store multiple digits
let num2 = []; //2nd operand, use array to store multiple digits
let op; //operator

function stringFromInput(input) {
  const inputString = input.join("");
  return inputString;
}

function numberFromInput(input) {
  const inputNumber = parseFloat(stringFromInput(input));
  return inputNumber;
}

//Object for storing current variables

//Basic operation

function operate(op1, op2, operator) {
  switch (operator) {
    case "+":
      return add(op1, op2);
    case "-":
      return subtract(op1, op2);
    case "*":
      return multiply(op1, op2);
    case "/":
      return divide(op1, op2);
    default:
      return "error";
  }
}
