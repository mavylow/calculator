const container = document.querySelector(".container");
const outputLine = document.querySelector(".output");

export const render = (buttons, operations) => {
  outputLine.textContent = "0";

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
