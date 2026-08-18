import { prefersReducedMotion } from "./accessibility.js" 
import { initTabs } from "@js/components/tabs";

/**
 * Wires a tabs-driven content panel to a data source: finds the
 * selected item by id, updates the panel with a reduced-motion-aware
 * fade transition, and initializes the underlying tabs controller.
 *
 * Shared by destination, crew, and technology — each feature only
 * supplies its own data array and DOM-update function; the find/fade/
 * init mechanics live here once instead of being duplicated per page.
 *
 * @param {Object} params
 * @param {Array<Object>} params.items - Data array to search by `id`
 *   (each item must have an `id` field matching the tabs' `data-id`).
 * @param {HTMLElement[]} params.tabs - Tab button elements
 *   (role="tab", with matching data-id attributes).
 * @param {HTMLElement} params.panel - The content panel to fade and
 *   update when the selected tab changes.
 * @param {(item: Object) => void} params.onUpdate - Applies the
 *   selected item's data to the DOM. Called after the fade-out
 *   completes (or immediately, if reduced motion is preferred).
 * @returns {void} Does nothing if tabs/panel are missing from the
 *   current page — safe to call unconditionally from a shared main.js.
 */

export function initTabFeature({ items, tabs, panel, onUpdate}) {
    if(!tabs || tabs.length === 0 || !panel) {
        return;
    }

    function findItem(id){
        return items.find((item) => item.id === id);
    }

    function update(id) {
        const item = findItem(id);

        if (!item) {
            return;
        }

        panel.classList.add("is-updating");

        const apply = () => {
            onUpdate(item);
            panel.classList.remove("is-updating");
        }

        if (prefersReducedMotion()) {
            apply();
        } else {
            panel.addEventListener("transitionend", apply, { once: true });
        }
    }

    initTabs({
        tabs,
        panel,
        onChange: update,
    });
}