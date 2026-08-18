import "@styles/app.css";

import { initMobileMenu, initNavHighlight } from "@js/components";
import { DOM } from "@js/shared";

/**
 * Runs an init function in isolation: a thrown error in one feature
 * (e.g. a missing DOM ref, a bad selector) is logged and swallowed
 * instead of stopping every other init call on the page. Each page
 * loads the same main.js, so a bug in one feature must not break
 * unrelated ones (e.g. a crew.html typo shouldn't take down the
 * mobile menu).
 *
 * @param {string} name - Label used in the console error, for
 *   quickly identifying which feature failed.
 * @param {() => void} fn - The init function to run.
 */

function safeInit(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[main] Failed ${name}:`, error);
  }
}

/**
 * App entry point, loaded by every page via the same <script> tag
 * (see partials/head-shared.html). Since this is a multi-page site,
 * not every page has every feature's markup — each feature-specific
 * block below is guarded by a DOM check before importing it.
 *
 * Feature modules are loaded via dynamic import() rather than static
 * import so Vite code-splits them: a page without, say, the crew
 * markup never downloads crew's JS bundle at all, not just skips
 * running it.
 */
async function initApp() {
  // Always present across all four pages — no guard needed.
  safeInit("nav-highlight", initNavHighlight);
  safeInit("mobile-menu", initMobileMenu);

  if (document.querySelector("[data-destination-panel]")) {
    const { initDestination } = await import("@js/features/destination");
    safeInit("destination", initDestination);
  }

  if (document.querySelector("[data-crew-panel]")) {
    const { initCrew } = await import("@js/features/crew");
    safeInit("crew", initCrew);
  }

  if (document.querySelector("[data-technology-panel]")) {
    const { initTechnology } = await import("@js/features/technology");
    safeInit("technology", initTechnology);
  }
}

initApp();
