import "./style.css";
import { render } from "./render.js";
import { BUTTONS, OPERATIONS } from "./const.js";

document.addEventListener("DOMContentLoaded", () => {
  render(BUTTONS, OPERATIONS);
});
