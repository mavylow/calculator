import { OPERATIONS } from "./const";

const ALL_OPERATIONS = { ...OPERATIONS, "%": 5, "low%": 2, "high%": 4, mod: 3 };

export const calculate = (expression) => {
  const numbers = [];
  const operators = [];
  let currentNumber = "";

  let expr = expression[0] === "-" ? "0" + expression : expression;
  expr = expr.replace(/,/g, ".").replace(/[()]/g, "");

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    const nextChar = expr[i + 1];

    if (/[\d.]/.test(char)) {
      currentNumber += char;
      continue;
    }

    if (ALL_OPERATIONS[char]) {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = "";
      }

      if (char === "-" && (i === 0 || ALL_OPERATIONS[expr[i - 1]])) {
        currentNumber = "-";
        continue;
      }

      if (char === "%") {
        const hasNextNum = nextChar && /[\d.]/.test(nextChar);
        if (hasNextNum) {
          operators.push("mod");
        } else {
          const prev = operators.at(-1);
          if (!prev) operators.push("high%");
          else if (["+", "-"].includes(prev)) operators.push("low%");
          else operators.push("high%");
        }
      } else {
        operators.push(char);
      }
    }
  }

  if (currentNumber) numbers.push(parseFloat(currentNumber));

  for (let priority = 5; priority > 0; priority--) {
    let j = 0;
    while (j < operators.length) {
      const op = operators[j];
      if (ALL_OPERATIONS[op] !== priority) {
        j++;
        continue;
      }

      let result;
      const a = numbers[j];
      const b = numbers[j + 1];

      switch (op) {
        case "high%":
          result = a / 100;
          numbers.splice(j, 1, result);
          operators.splice(j, 1);
          break;

        case "low%": {
          const percent = a / 100;
          if (j > 0) {
            const prev = numbers[j - 1];
            const prevOp = operators[j - 1];
            if (prevOp === "+") result = prev + prev * percent;
            else if (prevOp === "-") result = prev - prev * percent;
            else result = percent;

            numbers.splice(j - 1, 2, result);
            operators.splice(j - 1, 2);
            j--;
          } else {
            numbers.splice(j, 1, percent);
            operators.splice(j, 1);
          }
          break;
        }

        case "+":
          result = a + b;
          numbers.splice(j, 2, result);
          operators.splice(j, 1);
          break;

        case "-":
          result = a - b;
          numbers.splice(j, 2, result);
          operators.splice(j, 1);
          break;

        case "×":
          result = a * b;
          numbers.splice(j, 2, result);
          operators.splice(j, 1);
          break;

        case "÷":
          result = b !== 0 ? a / b : NaN;
          numbers.splice(j, 2, result);
          operators.splice(j, 1);
          break;

        case "mod":
          result = b !== 0 ? a % b : NaN;
          numbers.splice(j, 2, result);
          operators.splice(j, 1);
          break;

        default:
          j++;
      }

      if (isNaN(result)) return "Error";
    }
  }

  const result = numbers[0];
  return isNaN(result) ? "Error" : result.toString().replace(".", ",");
};
