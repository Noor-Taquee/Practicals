import { navBar } from "./components/navigation/script.js";
import { panelContainer } from "./app.js";

import { homePanel } from "./pages/home-panel/page.js";
import { physicsPanel } from "./pages/home-panel/inner-panels/physics-panel/physics-panel.js";
import { chemistryPanel } from "./pages/home-panel/inner-panels/chemistry-panel/chemistry-panel.js";

import {
  practicalsPanel,
  hashHandler as practicalsHashHandler,
} from "./pages/practicals-panel/page.js";

import { settingsPanel } from "./pages/settings-panel/page.js";
import { themePanel } from "./pages/settings-panel/inner-panels/theme-panel.js";
import { palettePanel } from "./pages/settings-panel/inner-panels/palette-panel.js";
import { accessibilityPanel } from "./pages/settings-panel/inner-panels/accessibility-panel.js";
import { errorPanel } from "./pages/settings-panel/inner-panels/error-panel.js";
import { aboutPanel } from "./pages/settings-panel/inner-panels/about-panel.js";

type HashHandler = (attr: string[]) => void;

type Route = Record<
  string,
  [HTMLDivElement, (Route | null)?, hashHandler?: HashHandler]
>;

const homeRoute: Route = {
  PhysicsPracticals: [physicsPanel],
  ChemistryPracticals: [chemistryPanel],
};

const settingsRoute: Route = {
  theme: [themePanel],
  palette: [palettePanel],
  accessibility: [accessibilityPanel],
  report: [errorPanel],
  about: [aboutPanel],
};

const mainRoute: Route = {
  "": [homePanel, homeRoute],
  "#home": [homePanel, homeRoute],
  "#practicals": [practicalsPanel, null, practicalsHashHandler],
  "#settings": [settingsPanel, settingsRoute],
};

function defaultHash() {
  window.location.hash = "#home";
}

function handle() {
  const hashParts = window.location.hash.split("&");
  // [#home/physicspanel, practical=screw_gauge, class=11,]

  const locationHash = hashParts[0] ?? "";
  const attributesHash = hashParts.slice(1);
  const fun: HashHandler | undefined = handleLocaton(locationHash);
  if (!fun) return;
  if (attributesHash.length >= 1) fun(hashParts.slice(1));
  // [ practical=screw_gauge, class=11 ]
}

function handleLocaton(locationString: string) {
  let fun: undefined | HashHandler;
  if (!locationString) {
    defaultHash();
    return;
  }
  // #home/physicspanel

  const location = locationString?.split("/");
  // [#home, physicspanel]
  let parentRoute: Route | undefined | null = mainRoute;

  location.forEach((path, index) => {
    if (!parentRoute) return;

    const lce = parentRoute[path];
    if (!lce) {
      defaultHash();
      return;
    }

    parentRoute = lce[1];
    const currentPanel = lce[0];
    if (index == 0) {
      fun = lce[2];
      navBar.style.setProperty(
        "--focus-no",
        String(currentPanel.dataset.index),
      );
    }
    if (index == location.length - 1) {
      showPanel(currentPanel);
    }
  });

  return fun;
}

function showPanel(newPanel: HTMLDivElement, animation = true) {
  if (panelContainer.firstChild)
    panelContainer.removeChild(panelContainer.firstChild);
  panelContainer.appendChild(newPanel);
  if (animation) return;
}

window.addEventListener("hashchange", handle);
window.addEventListener("load", handle);
