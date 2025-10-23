import { calculate } from "./calculation.js";
import { formattingInput } from "./formatting.js";
const container = document.querySelector(".container");
const outputLine = document.querySelector(".output");

export const render = (buttons, operations) => {
  if (!container) {
    console.error("Calculator container not found");
    return;
  }

  buttons.forEach((button) => {
    const buttonElement = document.createElement("div");
    buttonElement.className = "button";
    buttonElement.value = `${button}`;
    if (button === "0") {
      buttonElement.id = "zero";
    }
    if (["AC", "±", "%"].includes(button)) {
      buttonElement.className += " special";
    }
    if (Object.keys(operations).includes(button)) {
      buttonElement.className += " operation";
    }

    buttonElement.textContent = button;
    container.appendChild(buttonElement);
  });
};

container.addEventListener("click", (e) => {
  const char = e.target.value;
  const expression = outputLine.textContent;
  if (char === "AC") {
    outputLine.textContent = "";
  } else if (char === "=") {
    outputLine.textContent = calculate(expression, char);
  } else {
    outputLine.textContent = formattingInput(expression, char);
  }
});
