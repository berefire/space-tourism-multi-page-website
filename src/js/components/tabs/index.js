import { createTabsController } from "./controller.js";
import { registerTabEvents } from "./events.js";

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
