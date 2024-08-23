let operandA = "";
let operandB = "";
let operator = "";
let displayValue = "0";
const keys = document.querySelector(".keys");
const displayP = document.querySelector("#display-value");
const keyList = document.querySelectorAll(".key");

function add(opA, opB) {
  return opA + opB;
}
function subtract(opA, opB) {
  return opA - opB;
}
function multiply(opA, opB) {
  return opA * opB;
}
function divide(opA, opB) {
  return opA / opB;
}

function operate(operator, opA, opB) {
  console.log("operate function called.  operator = " + operator);
  let result;
  if (operator.includes("multiply")) {
    result = multiply(opA, opB);
  } else if (operator.includes("divide")) {
    if (opA === 0) {
      result = 0;
    } else {
      result = divide(opA, opB);
    }
  } else if (operator.includes("add")) {
    result = add(opA, opB);
  } else if (operator.includes("subtract")) {
    result = subtract(opA, opB);
  }
  displayValue = "";
  console.log(opA + " " + operator + " " + opB + " " + result);
  let result_str = result.toString();
  if (result_str.length <= 19) {
    //limit number of characters in display
    if (result_str.includes(".")) {
      /**
       * TODO: round decimal numbers
       */
      //check how many numbers AFTER decimal there are
      const rounded = result_str.split(".");
      const length = rounded[1].length;

      //use toFixed to round and update the display
      const fixed = parseFloat(result).toFixed(length);

      result_str = fixed.toString();
    }
    displayNumber(result_str);
  } else {
    result_str = result_str.substring(0, 19);
    // //TODO: if result is too long
    displayNumber(result_str);
  }
}
//Create the functions that populate the display when you click the number buttons.
function displayNumber(value) {
  //if displayContent = 0, replace it with textContent,
  if (displayValue === "0" || displayValue === "") {
    displayValue = value;
  } else {
    if (displayValue.length < 19) {
      //limit number of characters in display
      //else -> append textContent to the displayContent
      if (value === "." && displayValue.includes(".")) {
      } else {
        displayValue = displayValue + value;
      }
    }
  }
  displayP.textContent = displayValue;
  console.log(displayValue);
}
displayNumber("0");

keys.addEventListener("click", (event) => {
  const key = event.target.className;
  const value = event.target.textContent;

  //if number is clicked, append it to the displayValue until the operator/equal/clear button is clicked
  if (key.includes("number")) {
    displayNumber(value);
  } else if (key.includes("operator")) {
    if (operandA != "" && operator != "" && displayValue != "") {
      //only operate if all 3 variables are populated
      operandB = displayValue;
      operate(operator, parseFloat(operandA), parseFloat(operandB));
    }
    if ((displayValue != "0" || displayValue != "") && operandA == "") {
      //only update first operand if there is no first operand (operandA), AND user has pressed a numer
      operandA = displayValue;
    }
    operator = key;
    displayValue = "";
    console.log(operator);
    console.log(key);
    console.log("operandA" + operandA);
  } else if (key.includes("equal")) {
    console.log("equal button pressed");
    if (displayValue != "" && operandA != "" && operator != "") {
      //only oprate if all 3 variables are populated
      operandB = displayValue;
      operate(operator, parseFloat(operandA), parseFloat(operandB));
      operator = "";
      operandA = displayValue; //make the result the first oeprand of the next operation
      operandB = "";
    }
  } else if (key.includes("clear-btn")) {
    displayValue = "0";
    //value = "0"
    operandA = "";
    operandB = "";
    operator = "";
    displayNumber(displayValue);
  }
});

//when any key is clicked over an element, change the background color
keys.addEventListener("mousedown", (event) => {
  const key = event.target.className;

  if (key.includes("number")) {
    event.target.classList.replace("number", "key-pressed");
  } else if (key.includes("operator")) {
    event.target.classList.replace("operator", "key-pressed");
  } else if (key.includes("equal")) {
    event.target.classList.replace("equal-btn", "key-pressed");
  }
});
//when mouse is clicked up
keys.addEventListener("mouseup", (event) => {
  const key = event.target.className;

  if (key.includes("n")) {
    event.target.classList.replace("key-pressed", "number");
  } else if (key.includes("o")) {
    event.target.classList.replace("key-pressed", "operator");
  } else if (key.includes("e")) {
    event.target.classList.replace("key-pressed", "equal-btn");
  }
});
