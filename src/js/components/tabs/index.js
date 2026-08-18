import { createTabsController } from "./controller.js";
import { registerTabEvents } from "./events.js";

/**
 * Initializes a complete accessible tabs widget: creates the
 * controller, wires up click/keyboard events, and applies the
 * initial selection.
 *
 * @param {Object} params
 * @param {HTMLElement[]} params.tabs - Tab button elements.
 * @param {HTMLElement} params.panel - Associated tabpanel element.
 * @param {(id: string | null) => void} params.onChange - Called once
 *   immediately with the initial tab's id, then again on every
 *   subsequent selection change.
 * @returns {ReturnType<typeof createTabsController>} The underlying
 *   controller, in case the caller needs programmatic access
 *   (rarely needed — most features only use the onChange callback).
 */

export function initTabs({ tabs, panel, onChange }) {
  const controller = createTabsController({
    tabs,
    panel,
  });

  controller.init();

  registerTabEvents(controller, (tab) => {
    onChange(tab);
  });

  onChange(controller.getActiveId());

  return controller;
}
