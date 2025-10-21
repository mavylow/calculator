import "./style.css";
import { render } from "./render.js";

const BUTTONS = [
  "AC",
  "±",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ",",
  "=",
];

document.addEventListener("DOMContentLoaded", () => {
  render(BUTTONS);
});
