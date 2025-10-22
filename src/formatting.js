import { OPERATIONS, SPECIAL } from "./const.js";
const operators = Object.keys(OPERATIONS);
export const formattingInput = (computingString, char) => {
  const lastOperationIndex = computingString
    .split("")
    .reduce((lastIndex, char, i) => {
      return operators.includes(char) && computingString[i - 1] != "("
        ? i
        : lastIndex;
    }, -1);

  if (operators.includes(char)) {
    return formattingOperation(computingString, char);
  }
  if (SPECIAL.includes(char)) {
    console.log("special,", lastOperationIndex);
    return formattingSpecial(computingString, char, lastOperationIndex);
  }
  return computingString + char;
};

const formattingOperation = (computingString, char) => {
  const lastChar = computingString.at(-1);
  const secondLastChar = computingString.at(-2);

  if (lastChar === char) {
    return computingString;
  }

  if (operators.includes(lastChar)) {
    if (char === "-" && lastChar !== "-") {
      return computingString + char;
    }

    if (
      lastChar === "-" &&
      operators.includes(secondLastChar) &&
      char !== "-"
    ) {
      return computingString.slice(0, -2) + char;
    }

    return computingString.slice(0, -1) + char;
  }

  return computingString + char;
};

const formattingSpecial = (computingString, char, lastOperationIndex) => {
  const lastChar = computingString.at(-1);

  const getCurrentNumber = () => {
    let numberPart = computingString.slice(lastOperationIndex + 1);
    console.log("1numberPart", numberPart);
    if (numberPart.startsWith("(") && numberPart.endsWith(")")) {
      return numberPart.slice(2, -1);
    }
    return numberPart;
  };

  const currentNumber = getCurrentNumber();
  switch (char) {
    case ",":
      return formattingComma(computingString, lastChar, lastOperationIndex);
    case "±":
      return formattingPlusMinus(
        computingString,
        currentNumber,
        lastOperationIndex
      );
    default:
      return computingString + char;
  }
};

const formattingComma = (computingString, lastChar, lastOperationIndex) => {
  if (lastChar === ",") {
    return computingString;
  }

  const currentNumber = computingString.slice(lastOperationIndex + 1);

  const hasComma = currentNumber.includes(",");

  if (hasComma) {
    return computingString;
  }

  if (currentNumber === "") {
    return computingString + "0,";
  }

  return computingString + ",";
};

const formattingPlusMinus = (
  computingString,
  currentNumber,
  lastOperationIndex
) => {
  const currentOperator = computingString[lastOperationIndex];
  const prevChar = computingString[lastOperationIndex - 1];

  if (currentOperator === "-") {
    if (operators.includes(prevChar)) {
      return computingString.slice(0, lastOperationIndex) + currentNumber;
    }
    return computingString.slice(0, lastOperationIndex) + "+" + currentNumber;
  }

  if (currentOperator === "+") {
    if (prevChar === "(") {
      console.log(currentNumber);
      return computingString.slice(0, lastOperationIndex - 1) + currentNumber;
    }

    return computingString.slice(0, lastOperationIndex) + "-" + currentNumber;
  }

  if (currentOperator === "×" || currentOperator === "÷") {
    if (computingString[lastOperationIndex + 1] === "(") {
      return computingString.slice(0, lastOperationIndex + 1) + currentNumber;
    }
    return (
      computingString.slice(0, lastOperationIndex + 1) +
      "(-" +
      currentNumber +
      ")"
    );
  }

  if (lastOperationIndex === -1) {
    if (computingString.startsWith("-")) {
      return computingString.slice(1);
    } else {
      return "-" + computingString;
    }
  }
};
