import data from "@data/data.json";

import { resolveAsset, prefersReducedMotion } from "@js/shared";
import { initTabs } from "@js/components/tabs";
import { DOM } from "./dom.js";
import { SELECTORS } from "./selectors.js";

const technology = data.technology;

function findTechnology(id) {
  return technology.find((vehicle) => vehicle.id === id);
}

function updateImage(vehicle) {
  DOM.technologySource.srcset = resolveAsset(vehicle.images.landscape);
  DOM.technologyImage.src = resolveAsset(vehicle.images.portrait);
  DOM.technologyImage.alt = vehicle.name;
}

function updateInformation(vehicle) {
  DOM.technologyName.textContent = vehicle.name;
  DOM.technologyDescription.textContent = vehicle.description;
}

function updateTechnology(id) {
  const vehicle = findTechnology(id);

  if (!vehicle) {
    return;
  }

  const panel = DOM.technologyPanel;
  panel.classList.add("is-updating");
  if (prefersReducedMotion()) {
    updateImage(vehicle);
    updateInformation(vehicle);
    panel.classList.remove("is-updating");
  } else {
    panel.addEventListener("transitionend", () => {
      updateImage(vehicle);
      updateInformation(vehicle);
      panel.classList.remove("is-updating");
    }, { once: true });
  }
}

export function initTechnology() {
  const { technologyTabs, technologyPanel } = DOM;

  if (!technologyTabs || technologyTabs.length === 0 || !technologyPanel) {
    return;
  }

  initTabs({
    tabs: DOM.technologyTabs,
    panel: DOM.technologyPanel,
    onChange: updateTechnology,
  });
}