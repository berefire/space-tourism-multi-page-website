import "@styles/app.css";

import { initMobileMenu, initNavHighlight } from "@js/components";
import { DOM } from "@js/shared";

function safeInit(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[main] Failed ${name}:`, error);
  }
}

async function initApp() {
  safeInit("nav-highlight", initNavHighlight);
  safeInit("mobile-menu", initMobileMenu);
  

  if (document.querySelector("[data-destination-panel]")) {
    const { initDestination } = await import("@js/features/destination");
    safeInit("destination", initDestination);
  }
}

initApp();
