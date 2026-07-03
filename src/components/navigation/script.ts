import { createElement } from "../../utils/create-dom.js";

export const navBar = createElement("div", {
  id: "navigation-bar",
});

const navFocus = createElement("span", {
  id: "nav-focus",
});

// home
const homeBtn = createElement(
  "button",
  {
    className: "nav-btn",
  },
  [
    createElement("i", { className: "ph-bold ph-house" }),
    createElement("p", { textContent: "Home" }),
  ],
);
homeBtn.addEventListener("click", () => {
  window.location.hash = "#home";
});

// practicals
const practicalsBtn = createElement(
  "button",
  {
    className: "nav-btn",
  },
  [
    createElement("i", { className: "ph-bold ph-house" }),
    createElement("p", { textContent: "Practical" }),
  ],
);
practicalsBtn.addEventListener("click", () => {
  window.location.hash = "#practicals";
});

// settings
const settingsBtn = createElement(
  "button",
  {
    className: "nav-btn",
  },
  [
    createElement("i", { className: "ph-bold ph-gear-fine" }),
    createElement("p", { textContent: "Settings" }),
  ],
);
settingsBtn.addEventListener("click", () => {
  window.location.hash = "#settings";
});

navBar.append(navFocus, homeBtn, practicalsBtn, settingsBtn);
