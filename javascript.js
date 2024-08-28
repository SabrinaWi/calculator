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

let op1; //1st operand
let op2; //2nd operand
let operator; //operator

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

//Select buttons

const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    deactivateBtns(btns); //remove visual active state from previously used button
    activateBtn(btn); //mark current button visually as active
  });
});

//show visually when a button is active/has been clicked
function activateBtn(button) {
  button.classList.add("active");
}

//remove (visual) active state from previously active buttons
function deactivateBtns(buttons) {
  buttons.forEach((button) => button.classList.remove("active"));
}
