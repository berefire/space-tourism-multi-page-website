import data from "@data/data.json";

import { resolveAsset, prefersReducedMotion } from "@js/shared";
import { initTabs } from "@js/components/tabs";
import { DOM } from "./dom.js";
import { SELECTORS } from "./selectors.js";

const destinations = data.destinations;

function findDestination(id) {
  return destinations.find((destination) => destination.id === id);
}

function updateImage(destination) {
  DOM.destinationSource.srcset = resolveAsset(destination.images.webp);
  DOM.destinationImage.src = resolveAsset(destination.images.png);
  DOM.destinationImage.alt = destination.name;
}

function updateInformation(destination) {
  DOM.destinationName.textContent = destination.name;
  DOM.destinationDescription.textContent = destination.description;
  DOM.destinationDistance.textContent = destination.distance;
  DOM.destinationTravel.textContent = destination.travel;
}

function updateDestination(id) {
  const destination = findDestination(id);

  if (!destination) {
    return;
  }

  const panel = DOM.destinationPanel;
  panel.classList.add("is-updating");
  if (prefersReducedMotion()) {
    updateImage(destination);
    updateInformation(destination);
    panel.classList.remove("is-updating");
  } else {
    panel.addEventListener("transitionend", () => {
      updateImage(destination);
      updateInformation(destination);
      panel.classList.remove("is-updating");
    }, { once: true });
  }
}

export function initDestination() {
  const { destinationTabs, destinationPanel } = DOM;

  if (!destinationTabs || destinationTabs.length === 0 || !destinationPanel) {
    return;
  }

  initTabs({
    tabs: DOM.destinationTabs,
    panel: DOM.destinationPanel,
    onChange: updateDestination,
  });
}
