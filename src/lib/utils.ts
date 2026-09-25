// Dates are formatted in UTC so the build machine's time zone doesn't matter

export function formatMonth(string: string) {
  const date = new Date(string);
  const format = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return format.format(date);
}

export function formatDay(string: string) {
  const date = new Date(string);
  const format = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  return format.format(date);
}
