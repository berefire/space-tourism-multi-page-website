import data from "@data/data.json";

import { resolveAsset, prefersReducedMotion } from "@js/shared";
import { initTabs } from "@js/components/tabs";
import { DOM } from "./dom.js";
import { SELECTORS } from "./selectors.js";

const crew = data.crew;

function findCrewMember(id) {
  return crew.find((member) => member.id === id);
}

function updateImage(member) {
  DOM.crewSource.srcset = resolveAsset(member.images.webp);
  DOM.crewImage.src = resolveAsset(member.images.png);
  DOM.crewImage.alt = member.name;
}

function updateInformation(member) {
  DOM.crewRole.textContent = member.role;
  DOM.crewName.textContent = member.name;
  DOM.crewBio.textContent = member.bio;
}

function updateCrewMember(id) {
  const member = findCrewMember(id);

  if (!member) {
    return;
  }

  const panel = DOM.crewPanel;
  panel.classList.add("is-updating");
  if (prefersReducedMotion()) {
    updateImage(member);
    updateInformation(member);
    panel.classList.remove("is-updating");
  } else {
    panel.addEventListener("transitionend", () => {
      updateImage(member);
      updateInformation(member);
      panel.classList.remove("is-updating");
    }, { once: true });
  }
}

export function initCrew() {
  const { crewTabs, crewPanel } = DOM;

  if (!crewTabs || crewTabs.length === 0 || !crewPanel) {
    return;
  }

  initTabs({
    tabs: DOM.crewTabs,
    panel: DOM.crewPanel,
    onChange: updateCrewMember,
  });
}