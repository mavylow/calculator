export const render = (buttons) => {
  const container = document.querySelector(".calculator");

  if (!container) {
    console.error("Calculator container not found");
    return;
  }

  buttons.forEach((button) => {
    const buttonElement = document.createElement("div");
    buttonElement.className = "button";
    buttonElement.textContent = button;
    container.appendChild(buttonElement);
  });
};
