import { OPERATIONS, SPECIAL } from "./const.js";
const operators = Object.keys(OPERATIONS);

export const formattingInput = (expression, char) => {
  const lastOperationIndex = expression
    .split("")
    .reduce((lastIndex, char, i) => {
      return operators.includes(char) && expression[i - 1] != "("
        ? i
        : lastIndex;
    }, -1);

  if (operators.includes(char)) {
    return formattingOperation(expression, char);
  }
  if (SPECIAL.includes(char)) {
    return formattingSpecial(expression, char, lastOperationIndex);
  }

  if (
    expression.at(-1) === "0" &&
    !isPartOfNumber(expression, lastOperationIndex)
  ) {
    return expression.slice(0, expression.length - 1) + char;
  }

  if (char === "0") {
    return formattingZero(expression, char, lastOperationIndex);
  }
  return expression + char;
};

const isPartOfNumber = (expression, lastOperationIndex) => {
  const currentNumber = expression.slice(lastOperationIndex + 1);

  if (currentNumber === "0") {
    return false;
  }
  return currentNumber.length > 1 || currentNumber.includes(",");
};

const formattingOperation = (expression, char) => {
  const lastChar = expression.at(-1);
  const secondLastChar = expression.at(-2);

  if (lastChar === char) {
    return expression;
  }

  if (operators.includes(lastChar)) {
    if (char === "-" && lastChar !== "-") {
      return expression + char;
    }

    if (
      lastChar === "-" &&
      operators.includes(secondLastChar) &&
      char !== "-"
    ) {
      return expression.slice(0, -2) + char;
    }

    return expression.slice(0, -1) + char;
  }

  return expression + char;
};

const formattingSpecial = (expression, char, lastOperationIndex) => {
  const lastChar = expression.at(-1);

  const getCurrentNumber = () => {
    const numberPart = expression.slice(lastOperationIndex + 1);
    if (numberPart.startsWith("(") && numberPart.endsWith(")")) {
      return numberPart.slice(2, -1);
    }
    return numberPart;
  };

  const currentNumber = getCurrentNumber();
  switch (char) {
    case ",":
      return formattingComma(expression, lastChar, lastOperationIndex);
    case "±":
      return formattingPlusMinus(expression, currentNumber, lastOperationIndex);
    case "%":
      return formattingPercent(
        expression,
        lastChar,
        lastOperationIndex,
        currentNumber
      );
    default:
      return expression + char;
  }
};

const formattingComma = (expression, lastChar, lastOperationIndex) => {
  if (lastChar === ",") {
    return expression;
  }

  const currentNumber = expression.slice(lastOperationIndex + 1);
  const hasComma = currentNumber.includes(",");

  if (hasComma) {
    return expression;
  }

  if (currentNumber === "") {
    return expression + "0,";
  }

  return expression + ",";
};

const formattingPlusMinus = (expression, currentNumber, lastOperationIndex) => {
  const currentOperator = expression[lastOperationIndex];
  const prevChar = expression[lastOperationIndex - 1];

  if (currentOperator === "-") {
    if (operators.includes(prevChar)) {
      return expression.slice(0, lastOperationIndex) + currentNumber;
    }
    if (prevChar === undefined) {
      return expression.slice(0, lastOperationIndex) + currentNumber;
    }
    return expression.slice(0, lastOperationIndex) + "+" + currentNumber;
  }

  if (currentOperator === "+") {
    if (prevChar === "(") {
      return expression.slice(0, lastOperationIndex - 1) + currentNumber;
    }

    return expression.slice(0, lastOperationIndex) + "-" + currentNumber;
  }

  if (currentOperator === "×" || currentOperator === "÷") {
    if (expression[lastOperationIndex + 1] === "(") {
      return expression.slice(0, lastOperationIndex + 1) + currentNumber;
    }
    return (
      expression.slice(0, lastOperationIndex + 1) + "(-" + currentNumber + ")"
    );
  }

  if (lastOperationIndex === -1) {
    if (expression.startsWith("-")) {
      return expression.slice(1);
    } else {
      return "-" + expression;
    }
  }
};

const formattingPercent = (
  expression,
  lastChar,
  lastOperationIndex,
  currentNumber
) => {
  if (operators.includes(lastChar)) {
    return expression.slice(0, lastOperationIndex) + "%";
  }
  if (lastChar === "%") {
    return (
      expression.slice(0, lastOperationIndex + 1) + "(" + currentNumber + ")%"
    );
  }
  return expression + "%";
};

const formattingZero = (expression, char, lastOperationIndex) => {
  const currentNumber = expression.slice(lastOperationIndex + 1);
  const hasComma = currentNumber.includes(",");

  if (hasComma) {
    return expression + char;
  }
  if (currentNumber.startsWith("0")) {
    return expression;
  }
  return expression + char;
};
