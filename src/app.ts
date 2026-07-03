import "./app.css";

import { createElement } from "./utils/create-dom.js";
import { navBar } from "./components/navigation/script.js";

//#region app
export const app = document.getElementById("app") as HTMLDivElement;

function updateDeviceColors() {
  const themeTag = document.querySelector('meta[name="theme-color"]');
  const color = getComputedStyle(app).getPropertyValue("--primary-bg").trim();
  themeTag?.setAttribute("content", color);
}

// MARK: theme
app.dataset.theme = "light";

const themes = ["light", "dark"];

document.addEventListener("theme-change-request", (ev) => {
  const e = ev as CustomEvent<{ theme: string; source: string }>;
  const newTheme = e.detail.theme;
  const source = e.detail.source ?? "settings";

  if (!themes.includes(newTheme)) {
    requestAnimationFrame(() => {
      document.dispatchEvent(
        new CustomEvent("palette-change-error", {
          detail: {
            error: "Palette is not valid",
            source: source,
          },
        }),
      );
    });
  }

  app.dataset.theme = newTheme;
  if (source != "local-storage") localStorage.setItem("theme", newTheme);
  updateDeviceColors();

  requestAnimationFrame(() => {
    document.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: {
          theme: newTheme,
        },
      }),
    );
  });
});

// MARK: palette
app.dataset.palette = "default";

const palettes = ["default", "lime", "blue", "pink"];

document.addEventListener("palette-change-request", (ev) => {
  const e = ev as CustomEvent<{ palette: string; source: string }>;
  const newPalette = e.detail.palette;
  const source = e.detail.source ?? "settings";

  if (!palettes.includes(newPalette)) {
    requestAnimationFrame(() => {
      document.dispatchEvent(
        new CustomEvent("palette-change-error", {
          detail: {
            error: "Palette is not valid",
            source: source,
          },
        }),
      );
    });
  }

  app.dataset.palette = newPalette;
  if (source != "local-storage") localStorage.setItem("palette", newPalette);
  updateDeviceColors();

  requestAnimationFrame(() => {
    document.dispatchEvent(
      new CustomEvent("palette-change", {
        detail: {
          palette: newPalette,
        },
      }),
    );
  });
});

// MARK: orientation
app.dataset.orientation = "vertical";
function checkOrientation() {
  app.dataset.orientation =
    window.innerHeight < window.innerWidth ? "horizontal" : "vertical";
}
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);

// MARK: accessibility
document.addEventListener("accessibility-change-request", (e) => {
  const { font, header, icon } = (e as CustomEvent).detail;

  app.style.setProperty("--font-scale", font);
  localStorage.setItem("font-scale", font);

  app.style.setProperty("--header-scale", header);
  localStorage.setItem("header-scale", header);

  app.style.setProperty("--icon-scale", icon);
  localStorage.setItem("icon-scale", icon);

  requestAnimationFrame(() => {
    document.dispatchEvent(
      new CustomEvent("accessibility-change", {
        detail: {
          fontScale: font,
          headerScale: header,
          iconScale: icon,
        },
      }),
    );
  });
});
//#endregion app

export const panelContainer = createElement("div", {
  className: "panel-container",
});

app.append(panelContainer, navBar);
