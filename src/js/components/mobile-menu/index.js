import { DOM, MEDIA_QUERIES } from "@js/shared";

import { createMenuController } from "./controller.js";
import { bindMenuEvents } from "./events.js";

/**
 * Initializes the mobile navigation menu on pages that have it (all
 * four pages share the same header partial, so this always finds its
 * elements — the guard below is defensive in case that ever changes).
 */

export function initMobileMenu() {
  const { menuButton, primaryNavigation } = DOM;

  if (!menuButton || !primaryNavigation) return;

  const tabletMedia = window.matchMedia(MEDIA_QUERIES.tablet);

  const controller = createMenuController({
    menuButton,
    primaryNavigation,
    tabletMedia,
  });

  controller.syncResponsiveState();

  // Defers enabling the CSS transition by one frame, so the nav's
  // initial state (open/closed, inert) is applied instantly on load
  // with no animation — only user-triggered toggles after this point
  // should visibly slide the menu in/out. See `data-ready` in the CSS.
  
  requestAnimationFrame(() => {
    primaryNavigation.dataset.ready = "true";
  });

  bindMenuEvents({
    menuButton,
    primaryNavigation,
    controller,
    tabletMedia,
  });
}
