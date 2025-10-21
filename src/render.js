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
  outputLine.textContent += e.target.value;
});
