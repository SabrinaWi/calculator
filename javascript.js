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

//Variables for storing input

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

//number buttons

const numBtns = document.querySelectorAll(".num-btn");

numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", (event) => {
    storeNumBtnInput(numBtn);
  });
});

function storeNumBtnInput(numBtn) {
  if (!op) {
    //stores new input in num1 array as long as there there has been no operator input
    num1.push(numBtn.name.slice(-1));
    return num1;
  } else {
    //otherwise stores new input in num2 array
    num2.push(numBtn.name.slice(-1));
    return num2;
  }
}

//operator buttons

const opBtns = document.querySelectorAll(".op-btn");

opBtns.forEach((opBtn) => {
  opBtn.addEventListener("click", (event) => {
    storeOpBtnInput(opBtn);
  });
});

function storeOpBtnInput(opBtn) {
  if (num1) {
    switch (opBtn.name) {
      //stores new input in op as long as there there is already a num1
      case "btn-add":
        return (op = "+");
      case "btn-sub":
        return (op = "-");
      case "btn-mul":
        return (op = "*");
      case "btn-div":
        return (op = "/");
      default:
        return "error";
    }
  }
}

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
