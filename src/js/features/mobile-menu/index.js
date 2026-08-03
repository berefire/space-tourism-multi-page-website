import { MEDIA_QUERIES, DOM } from "@js/shared";

import { createMenuController } from "./controller.js";
import { bindMenuEvents } from "./events.js";

export function initMobileMenu() {
  const { menuButton, primaryNavigation } = DOM;

  if (!menuButton || !primaryNavigation) return;

  const tabletMedia = window.matchMedia(
    MEDIA_QUERIES.tablet,
  );

  const controller = createMenuController({
    menuButton,
    primaryNavigation,
    tabletMedia,
  });

  controller.syncResponsiveState();

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