export function timeAgo(inputTime: string | number | Date): string {
  let time: number;

  // Convert inputTime to a timestamp
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
    [120, "1 minute ago", "1 minute ago"],
    [3600, "minutes", 60],
    [7200, "1 hour ago", "1 hour ago"],
    [86400, "hours", 3600],
    [172800, "Yesterday", "Yesterday"],
    [604800, "days", 86400],
    [1209600, "Last week", "Last week"],
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

  // Handle future times
  if (seconds < 0) {
    token = "from now";
    listChoice = 2;
  }

  const absSeconds = Math.abs(seconds);
  const format = timeFormats.find(([limit]) => absSeconds < limit);

  if (format) {
    const [, unit, divisorOrMessage] = format;

    // Handle special cases where divisorOrMessage is a string
    if (typeof divisorOrMessage === "string") {
      return listChoice === 1
        ? divisorOrMessage // Past message
        : `${divisorOrMessage.replace("ago", "ago")}`; // Future message
    }

    // Handle regular cases where divisorOrMessage is a number
    const value = Math.floor(absSeconds / divisorOrMessage);
    return `${value} ${unit} ${token}`;
  }

  // Fallback for very large time differences
  const [, unit, divisor] = timeFormats[timeFormats.length - 1];
  const value = Math.floor(absSeconds / (divisor as number));
  return `${value} ${unit} ${token}`;
}
