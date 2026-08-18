// Resolved DOM refs for this feature — see buildDOMRefs() for details
// on selector format and dev-mode warnings.

import { buildDOMRefs } from "./dom-utils.js";
import { SELECTORS } from "./selectors.js";

export const DOM = buildDOMRefs(SELECTORS);