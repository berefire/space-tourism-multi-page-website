const images = import.meta.glob("/src/assets/images/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

export function resolveAsset(path){
    const resolved = images[path];
    if (!resolved) {
        console.warn(`Asset not found: ${path}`);
    }
    return resolved ?? path;
}