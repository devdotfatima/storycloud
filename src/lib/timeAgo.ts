export function timeAgo(inputTime: string | number | Date): string {
  let time: number;

  if (typeof inputTime === "string") {
    time = new Date(inputTime).getTime();
  } else if (inputTime instanceof Date) {
    time = inputTime.getTime();
  } else if (typeof inputTime === "number") {
    time = inputTime;
  } else {
    time = Date.now(); // Fallback to current time
  }

  const timeFormats: [number, string, string | number][] = [
    [60, "seconds", 1],
    [120, "1 minute ago", "1 minute from now"],
    [3600, "minutes", 60],
    [7200, "1 hour ago", "1 hour from now"],
    [86400, "hours", 3600],
    [172800, "Yesterday", "Tomorrow"],
    [604800, "days", 86400],
    [1209600, "Last week", "Next week"],
    [2419200, "weeks", 604800],
    [4838400, "Last month", "Next month"],
    [29030400, "months", 2419200],
    [58060800, "Last year", "Next year"],
    [2903040000, "years", 29030400],
    [5806080000, "Last century", "Next century"],
    [58060800000, "centuries", 2903040000],
  ];

  const seconds = (Date.now() - time) / 1000;
  let token = "ago";
  let listChoice = 1;

  if (seconds < 1) {
    return "Just now";
  }
  if (seconds < 0) {
    token = "from now";
    listChoice = 2;
  }

  const absSeconds = Math.abs(seconds);
  const format = timeFormats.find(([limit]) => absSeconds < limit);

  if (format) {
    const [, unit, divisorOrMessage] = format;

    if (typeof divisorOrMessage === "string") {
      return divisorOrMessage[listChoice] as string;
    }

    const value = Math.floor(absSeconds / divisorOrMessage);
    return `${value} ${unit} ${token}`;
  }

  const [, unit, divisor] = timeFormats[timeFormats.length - 1];
  const value = Math.floor(absSeconds / (divisor as number));
  return `${value} ${unit} ${token}`;
}
