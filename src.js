let operandA;
let operandB;
let operator;
function add() {

}
function substract() {

}
function multiply() {

}
function divide() {

}

function operate(operator, opA, opB) {
  if (operator === "*") {
    return multiply(opA, opB);
  }
  else if (operator === "/") {
    return divide(opA, opB);
  }
  else if (operator === "+") {
    return add(opA, opB);
  }
  else (operator === "-"){
    return substract(opA, opB);
  }
}

