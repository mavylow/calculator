import { OPERATIONS } from "./const";
const ALL_OPERATIONS = { ...OPERATIONS, "low%": 2, "high%": 4, mod: 3 };

export const calculate = (expression) => {
  const numbers = [];
  const operators = [];
  let currentNumber = "";

  let expr = expression[0] === "-" ? "0" + expression : expression;
  expr = expr.replace(/,/g, ".");
  expr = expr.replace(/[()]/g, "");

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    const nextChar = expr[i + 1];

    if (/[\d.]/.test(char)) {
      currentNumber += char;
    }

    if (ALL_OPERATIONS[char] && !/[\d.]/.test(char)) {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = "";
      }

      if (char === "-" && (i === 0 || ALL_OPERATIONS[expr[i - 1]])) {
        currentNumber += "-";
      } else if (char === "%") {
        const hasNextNumber = nextChar && /[\d.]/.test(nextChar);

        if (hasNextNumber) {
          operators.push("mod");
        } else {
          const prevOperator = operators[operators.length - 1];

          if (!prevOperator) {
            operators.push("high%");
          } else if (prevOperator === "+" || prevOperator === "-") {
            operators.push("low%");
          } else if (prevOperator === "×" || prevOperator === "÷") {
            operators.push("high%");
          } else {
            operators.push("high%");
          }
        }
      } else {
        operators.push(char);
      }
    }
  }

  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }

  console.log("Numbers:", numbers);
  console.log("Operators:", operators);

  for (let priority = 4; priority > 0; priority--) {
    let j = 0;
    while (j < operators.length) {
      const currentOperation = operators[j];

      if (ALL_OPERATIONS[currentOperation] === priority) {
        let resultNumber;

        if (currentOperation === "high%") {
          resultNumber = numbers[j] / 100;
          numbers.splice(j, 1, resultNumber);
          operators.splice(j, 1);
        } else if (currentOperation === "low%") {
          const percentValue = numbers[j] / 100;

          if (j > 0) {
            const prevNumber = numbers[j - 1];
            const prevOperator = operators[j - 1];

            if (prevOperator === "+") {
              resultNumber = prevNumber + prevNumber * percentValue;
            } else if (prevOperator === "-") {
              resultNumber = prevNumber - prevNumber * percentValue;
            } else {
              resultNumber = percentValue;
            }

            numbers.splice(j - 1, 2, resultNumber);
            operators.splice(j - 1, 2);
          } else {
            resultNumber = percentValue;
            numbers.splice(j, 1, resultNumber);
            operators.splice(j, 1);
          }
        } else {
          const firstNum = numbers[j];
          const secondNum = numbers[j + 1];

          switch (currentOperation) {
            case "+":
              resultNumber = firstNum + secondNum;
              break;
            case "-":
              resultNumber = firstNum - secondNum;
              break;
            case "×":
              resultNumber = firstNum * secondNum;
              break;
            case "÷":
              resultNumber = secondNum !== 0 ? firstNum / secondNum : NaN;
              break;
            case "mod":
              resultNumber = secondNum !== 0 ? firstNum % secondNum : NaN;
              break;
            default:
              resultNumber = firstNum;
          }

          if (isNaN(resultNumber)) {
            return "Error";
          }

          numbers.splice(j, 2, resultNumber);
          operators.splice(j, 1);
        }
      } else {
        j++;
      }
    }
  }

  const result = numbers[0];
  return isNaN(result) ? "Error" : result.toString().replace(".", ",");
};
