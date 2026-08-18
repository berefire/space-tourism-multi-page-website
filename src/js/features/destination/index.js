import data from "@data/data.json";
import { resolveAsset } from "@js/shared";
import { initTabFeature } from "@js/shared/tab-feature.js";
import { DOM } from "./dom.js";

/**
 * Applies a destination item's data to the DOM — the only
 * destination-specific piece; everything else is handled by
 * initTabFeature.
 *
 * @param {Object} destination - A destination entry from data.json
 *   (moon, mars, europa, or titan).
 */

function updateDestination(destination) {
  DOM.destinationSource.srcset = resolveAsset(destination.images.webp);
  DOM.destinationImage.src = resolveAsset(destination.images.png);
  DOM.destinationImage.alt = destination.name;

  DOM.destinationName.textContent = destination.name;
  DOM.destinationDescription.textContent = destination.description;
  DOM.destinationDistance.textContent = destination.distance;
  DOM.destinationTravel.textContent = destination.travel;
}

export function initDestination() {
  initTabFeature({
    items: data.destinations,
    tabs: DOM.destinationTabs,
    panel: DOM.destinationPanel,
    onUpdate: updateDestination,
  });
}
