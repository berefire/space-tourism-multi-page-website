/**
 * Resolves a map of selector definitions into a frozen object of real
 * DOM references, ready to destructure and use directly (no repeated
 * querySelector calls scattered through feature code).
 *
 * In development, logs a console warning for any selector that
 * matched nothing — helps catch typos or stale selectors early,
 * without failing the build. This check is stripped entirely from
 * production builds via import.meta.env.DEV.
 *
 * @param {Object<string, {selector: string, all: boolean}>} selectors
 *   A map of ref names to their query definition. `all: true` uses
 *   querySelectorAll (returns a NodeList, possibly empty); `all: false`
 *   uses querySelector (returns a single Element or null).
 * @returns {Readonly<Object<string, Element|NodeList|null>>} A frozen
 *   object with the same keys as `selectors`, each resolved to its
 *   matching DOM element(s). A missing selector resolves to `null`
 *   (single) or an empty NodeList (all) — callers should guard against
 *   this rather than assume every ref exists on every page, since this
 *   function is shared across pages that don't all have the same DOM.
 *
 * @example
 * // features/crew/selectors.js
 * export const SELECTORS = Object.freeze({
 *   crewTabs: { selector: "[data-crew-tab]", all: true },
 *   crewPanel: { selector: "[data-crew-panel]", all: false },
 * });
 *
 * // features/crew/dom.js
 * import { buildDOMRefs } from "@js/shared/dom-utils.js";
 * import { SELECTORS } from "./selectors.js";
 * export const DOM = buildDOMRefs(SELECTORS);
 */

export function buildDOMRefs(selectors) {
  const elements = Object.fromEntries(
    Object.entries(selectors).map(([key, { selector, all }]) => {
      const result = all
        ? document.querySelectorAll(selector)
        : document.querySelector(selector);

      if (import.meta.env.DEV) {
        const isEmpty = all ? result.length === 0 : result === null;
        if (isEmpty) {
          console.warn(`[DOM] No element found for "${key}" → ${selector}`);
        }
      }

      return [key, result];
    }),
  );

  return Object.freeze(elements);
}






