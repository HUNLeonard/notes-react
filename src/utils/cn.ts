export default function cn(...args: (string | boolean)[]) {
  return args
    .map((arg) => {
      return !arg || typeof arg === "boolean" ? "" : arg.trim();
    })
    .join(" ");
}
