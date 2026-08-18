import data from "@data/data.json";
import { resolveAsset } from "@js/shared";
import { initTabFeature } from "@js/shared/tab-feature.js";
import { DOM } from "./dom.js";

/**
 * Applies a crew member's data to the DOM — the only
 * crew-specific piece; everything else is handled by
 * initTabFeature.
 *
 * @param {Object} member - A crew entry from data.json
 *   (commander, pilot, engineer, or specialist).
 */

function updateCrew(member) {
  DOM.crewSource.srcset = resolveAsset(member.images.webp);
  DOM.crewImage.src = resolveAsset(member.images.png);
  DOM.crewImage.alt = `${member.name}, ${member.role}`;

  DOM.crewRole.textContent = member.role;
  DOM.crewName.textContent = member.name;
  DOM.crewBio.textContent = member.bio;
}

export function initCrew() {
  initTabFeature({
    items: data.crew,
    tabs: DOM.crewTabs,
    panel: DOM.crewPanel,
    onUpdate: updateCrew,
  });
}
