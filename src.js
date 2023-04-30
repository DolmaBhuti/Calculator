operandA = "";
operandB = "";
operator = "";
let displayValue = "0";
const keys = document.querySelector(".keys");
const displayP = document.querySelector("#display-value");

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
  }
  else if (operator.includes("divide")) {
    result = divide(opA, opB);
  }
  else if (operator.includes("add")) {
    result = add(opA, opB);
  }
  else if (operator.includes("subtract")) {
    result = subtract(opA, opB);
  }
  displayValue = "";
  console.log(opA + " " + operator + " " + opB + " " + result);
  displayNumber(result);
}
//Create the functions that populate the display when you click the number buttons.
//add event listener for when someone clicks a number button
function displayNumber(value) {
  //if displayContent = 0, replace it with textContent,
  if (displayValue === "0" || displayValue === "") {
    displayValue = value;
  } else {
    //else -> append textContent to the displayContent
    if (value === "." && displayValue.includes(".")) {  //cant have 2 decimals
      displayValue = displayValue;
    }
    else {
      if (displayValue.length <= 10) {
        displayValue = displayValue + value;
      }
    }
  }
  //round displayvalue with long decimals so that they don’t overflow the screen

  displayP.textContent = displayValue;
}
displayNumber("0");
//when a number is clicked, display it

keys.addEventListener('click', (event) => {
  const key = event.target.className;
  const value = event.target.textContent;

  //if number is clicked, append it to the displayValue until the operator/equal/clear button is clicked
  if (key === "number") {
    displayNumber(value);
  }
  else if (key.includes("operator")) { //if operator is clicked, then make the first operand the displayValue (if its empty)
    //if second operator is clicked: 
    //first, evaluate the first pair of numbers (12 + 7), 
    //second, display the result of that calculation (19), 
    //and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
    if (operandA != "" && operator != "" && displayValue != "") {  //only oprate if all 3 variables are populated
      operandB = displayValue;
      operate(operator, parseFloat(operandA), parseFloat(operandB));
    }
    operandA = displayValue;
    operator = key;
    displayValue = "";
  }
  else if (key === "equal-btn") {
    console.log("equal button pressed");
    if (displayValue != "" && operandA != "" && operator != "") {  //only oprate if all 3 variables are populated
      operandB = displayValue;
      operate(operator, parseFloat(operandA), parseFloat(operandB));
      operator = "";
    }
  }
  else if (key === "clear-btn") {
    displayValue = "0";
    operandA = "";
    operandB = "";
    operator = "";
    displayNumber(displayValue);
  }
});

/**
 * 1. user presses numbers
 * - save the number in the displayValue
 * 2. user presses operator
 * - save the operator in the operator variable
 * IF there are two operands already -> operate on it
 * ELSE dont do anything
 */