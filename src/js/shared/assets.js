/**
 * Eagerly imported map of every image under src/assets/images, keyed by
 * their absolute source path (e.g. "/src/assets/images/crew/photo.png").
 * Populated at build time via import.meta.glob so Vite can hash and
 * bundle each file correctly — a plain string path in JSON data would
 * work in dev (Vite serves /src/ directly) but silently 404 in a
 * production build with a non-root `base`, since Rollup only picks up
 * assets it can see referenced as real imports.
 */

const images = import.meta.glob("/src/assets/images/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

/**
 * Resolves a raw asset path from data.json to its real, build-safe URL.
 *
 * @param {string} path - Path exactly as written in data.json
 *   (e.g. "/src/assets/images/crew/image-douglas-hurley.png").
 * @returns {string} The resolved URL Vite generated for that asset, or
 *   the original path unchanged if no match was found (with a dev-time
 *   console warning to help catch typos in data.json early).
 */

export function resolveAsset(path){
    const resolved = images[path];
    if (!resolved) {
        console.warn(`Asset not found: ${path}`);
    }
    return resolved ?? path;
}