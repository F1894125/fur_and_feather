const images = import.meta.glob("../assets/**/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const getImageUrl = (name: string): string => {
  const path = `../assets/${name}`;
  const url = images[path];

  if (!url) {
    console.warn(`Image not found: ${path}`);
    return "";
  }

  return url;
};
