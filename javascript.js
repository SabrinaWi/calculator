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
    updateDisplay(num1, num2, op, result);
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
    updateDisplay(num1, num2, op, result);
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
    updateDisplay(num1, num2, op, result);
  });
});

function storeOpBtnInput(opBtn) {
  if (num1.length && !op && !num2.length && !result) {
    switch (opBtn.id) {
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
        return { error: "Invalid operator" };
    }
  } else if (num1.length && op && num2.length && !result) {
    //user can push operator and force a result to continue with operation
    const operation = getOperationObject(num1, num2, op);
    operate(operation);
    num1 = [result];
    num2 = [];
    result = ""; //this has to be here or the conditions for updateDisplay() don't work anymore!
    switch (opBtn.id) {
      case "btn-add":
        return (op = "+");
      case "btn-sub":
        return (op = "-");
      case "btn-mul":
        return (op = "*");
      case "btn-div":
        return (op = "/");
      default:
        return { error: "Invalid operator" };
    }
  } else if (result) {
    //user can continue with the result of a previous operation
    num1 = [result];
    num2 = [];
    result = ""; //this has to be here or the conditions for updateDisplay() don't work anymore!
    switch (opBtn.id) {
      case "btn-add":
        return (op = "+");
      case "btn-sub":
        return (op = "-");
      case "btn-mul":
        return (op = "*");
      case "btn-div":
        return (op = "/");
      default:
        return { error: "Invalid operator" };
    }
  }
  return {
    num1: num1,
    num2: num2,
    op: op,
  };
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
  if (num1.length && num2.length && op) {
    const operation = getOperationObject(num1, num2, op);
    operate(operation);
    updateDisplay(num1, num2, op, result);
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
  result = Math.round(result * 10000) / 10000; //round result to avoid long decimals
  return result;
}

//Dot button/decimal point

const dotBtn = document.querySelector("#btn-dot");

dotBtn.addEventListener("click", (event) => {
  if (!op) {
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
  } else if (num1.length && op) {
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
  updateDisplay(num1, num2, op, result);
});

//CE button

const ceBtn = document.querySelector("#btn-CE");

ceBtn.addEventListener("click", (event) => {
  num1 = [];
  num2 = [];
  op = "";
  result = "";
  currentDisplay = "0";
  updateDisplay(num1, num2, op, result);
  deactivateBtns(btns);
});

//backspace button

const bckspBtn = document.querySelector("#btn-bcksp");

bckspBtn.addEventListener("click", (event) => {
  removeLastInput();
  updateDisplay(num1, num2, op, result);
});

function removeLastInput() {
  if (num1.length && !op && !num2.length && !result) {
    num1.pop();
    return num1;
  } else if (num1.length && op && !num2.length && !result) {
    op = "";
    return op;
  } else if (num1.length && op && num2.length && !result) {
    num2.pop();
    return num2;
  } else if (num1.length && op && num2.length && result) {
    result = result.toString().slice(0, -1); //turns result into string temporarily to make it possible to use backspace on the result
    result = result ? Number(result) : 0; // turns it back into a number and ensures result is 0 if empty
    return result;
  }
}

//add keyboard support

function keyPress(event) {
  const key = event.key;
  keyToButton(key);
}

function keyToButton(key) {
  btns.forEach((btn) => {
    // compares the key to the button's name attribute
    if (key == btn.name) {
      btn.click(); // Reuse my existing button click logic
    }
  });
}

window.addEventListener("keydown", keyPress);

//display input

const display = document.querySelector(".display .content");

let currentDisplay = 0;
display.textContent = currentDisplay;

function updateDisplay(num1, num2, op, result) {
  const opObj = getOperationObject(num1, num2, op, result);
  if (num1.length && !op && !num2.length && !result) {
    currentDisplay = opObj.op1;
  } else if (num1.length && op && !num2.length && !result) {
    currentDisplay = opObj.op1 + " " + opObj.operator;
  } else if (num1.length && op && num2.length && !result) {
    currentDisplay = opObj.op1 + " " + opObj.operator + " " + opObj.op2;
  } else if (num1.length && op && num2.length && result) {
    currentDisplay = result;
  } else {
    currentDisplay = "0";
  }
  display.textContent = currentDisplay;
  updateFontSize();
}

function updateFontSize() {
  if (display.scrollWidth > display.clientWidth) {
    display.style.fontSize = "5rem"; // shrinks font if content overflows
  } else {
    display.style.fontSize = "10rem"; // default size
  }
}
