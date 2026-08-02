import { SELECTORS } from "./selectors.js";

function initDOMElements() {
  const elements = Object.fromEntries(
    Object.entries(SELECTORS).map(([key, selector]) => [
      key,
      document.querySelector(selector),
    ]),
  );

  return Object.freeze(elements);
}

export const DOM = initDOMElements();