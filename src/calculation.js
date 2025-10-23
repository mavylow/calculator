import { OPERATIONS } from "./const";

export const calculate = (expression) => {
  console.log(expression);
  const numbers = [];
  const operators = [];
  let currentNumber = "";

  let expr = expression[0] === "-" ? "0" + expression : expression;
  expr = expr.replace(/,/g, ".");

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (/[\d.]/.test(char)) {
      currentNumber += char;
    }
    if (OPERATIONS[char] && !/[\d.]/.test(char)) {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = "";
      }

      if (char === "-" && (i === 0 || OPERATIONS[expr[i - 1]])) {
        currentNumber += "-";
      } else {
        operators.push(char);
      }
    }
  }

  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }
  console.log(numbers);
  console.log(operators);

  for (let priority = 3; priority > 0; priority--) {
    let j = 0;
    while (j < operators.length) {
      const currentOperation = operators[j];
      let resultNumber;
      if (
        OPERATIONS[currentOperation] === priority &&
        currentOperation !== "%"
      ) {
        const firstNum = numbers[j];
        const secondNum = numbers[j + 1];
        resultNumber =
          currentOperation === "+"
            ? firstNum + secondNum
            : currentOperation === "-"
            ? firstNum - secondNum
            : currentOperation === "×"
            ? firstNum * secondNum
            : currentOperation === "÷"
            ? firstNum / secondNum
            : firstNum;

        numbers.splice(j, 2, resultNumber);
        operators.splice(j, 1);
      } else if (currentOperation === "%") {
        const number = numbers[j];
        const prevOperator = operators[j - 1];

        if (!prevOperator) {
          resultNumber = number / 100;
        } else if (prevOperator === "+" || prevOperator === "-") {
          const prevNumber = numbers[j - 1] || 0;
          resultNumber = prevNumber * (number / 100);
        } else {
          resultNumber = number / 100;
        }
        numbers.splice(j, 1, resultNumber);
        operators.splice(j, 1);
      } else {
        j++;
      }
    }
  }

  return numbers[0];
};
