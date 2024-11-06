const formatter = new Intl.RelativeTimeFormat("en", { style: "short" });

export function formatDate(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const seconds = diff / 1000;
  if (seconds < 60) return formatter.format(-Math.trunc(seconds), "seconds");
  const minutes = seconds / 60;
  if (minutes < 60) return formatter.format(-Math.trunc(minutes), "minutes");
  const hours = minutes / 60;
  if (hours < 24) return formatter.format(-Math.trunc(hours), "hours");
  else return formatter.format(Math.trunc(-hours), "days");
}
