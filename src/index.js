import "./style.css";
import { render } from "./render.js";
import { BUTTONS, OPERATIONS } from "./const.js";
import { calculate } from "./calculation.js";
import { formattingInput } from "./formatting.js";

document.addEventListener("DOMContentLoaded", () => {
  render(BUTTONS, OPERATIONS);
});

const container = document.querySelector(".container");
const outputLine = document.querySelector(".output");

container.addEventListener("click", (e) => {
  const char = e.target.value;
  const expression = outputLine.textContent;
  if (char === "AC") {
    outputLine.textContent = "0";
  } else if (char === "=") {
    outputLine.textContent = calculate(expression, char);
  } else {
    outputLine.textContent = formattingInput(expression, char);
  }
});
