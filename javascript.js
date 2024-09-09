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

//Variables for storing input and results

let num1 = []; //1st operand, use array to store multiple digits
let num2 = []; //2nd operand, use array to store multiple digits
let op; //operator
let result;

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

//Object for storing current variables

function getOperationObject(num1, num2, op) {
  return {
    op1: parseFloat(num1.join("")),
    op2: parseFloat(num2.join("")),
    operator: op,
  };
}

//Equals button

const eqBtn = document.querySelector("#btn-eq");

eqBtn.addEventListener("click", (event) => {
  if (num1 && num2 && op) {
    const operation = getOperationObject(num1, num2, op);
    operate(operation);
  }
});

//Basic operation

function operate(operation) {
  switch (operation.operator) {
    case "+":
      result = add(operation.op1, operation.op2);
      break;
    case "-":
      result = subtract(operation.op1, operation.op2);
      break;
    case "*":
      result = multiply(operation.op1, operation.op2);
      break;
    case "/":
      result = divide(operation.op1, operation.op2);
      break;
    default:
      result = "error";
  }
  return result;
}

//Dot button/decimal point

const dotBtn = document.querySelector("#btn-dot");

dotBtn.addEventListener("click", (event) => {
  if (num1 && !op) {
    {
      if (num1.includes(".")) {
        //do nothing, decimal point already exists
      } else {
        num1.push(".");
      }
    }
    if (num1[0] === ".") {
      //adds a "0" to the beginning of the array if the first thing entered is the decimal point
      num1.unshift("0");
    }
    return num1;
  } else if (num1 && op) {
    {
      if (num2.includes(".")) {
        //do nothing, decimal point already exists
      } else {
        num2.push(".");
      }
    }
    if (num2[0] === ".") {
      //adds a "0" to the beginning of the array if the first thing entered is the decimal point
      num2.unshift("0");
    }
    return num2;
  }
});
