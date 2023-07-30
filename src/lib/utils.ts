export function formatDate(string: string) {
  const date = new Date(string);
  const format = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });
  return format.format(date);
}
