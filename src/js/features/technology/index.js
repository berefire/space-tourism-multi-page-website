import data from "@data/data.json";
import { resolveAsset } from "@js/shared";
import { initTabFeature } from "@js/shared/tab-feature.js";
import { DOM } from "./dom.js";

/**
 * Applies a technology item's data to the DOM — the only
 * technology-specific piece; everything else is handled by
 * initTabFeature.
 *
 * @param {Object} vehicle - A technology entry from data.json
 *   (launch-vehicle, spaceport, or space-capsule).
 */

function updateTechnology(vehicle) {
  DOM.technologySource.srcset = resolveAsset(vehicle.images.landscape);
  DOM.technologyImage.src = resolveAsset(vehicle.images.portrait);
  DOM.technologyImage.alt = vehicle.name;

  DOM.technologyName.textContent = vehicle.name;
  DOM.technologyDescription.textContent = vehicle.description;
}

export function initTechnology() {
  initTabFeature({
    items: data.technology,
    tabs: DOM.technologyTabs,
    panel: DOM.technologyPanel,
    onUpdate: updateTechnology,
  });
}
