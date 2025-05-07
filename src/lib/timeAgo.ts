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
    [120, "1 m ", "1 m"],
    [3600, "m", 60],
    [7200, "1 h", "1 h"],
    [86400, "h", 3600],
    [172800, "Yesterday", "Yesterday"],
    [604800, "d", 86400],
    [1209600, "1 w", "1 w"],
    [2419200, "w", 604800],
    [4838400, "1 mo", "1 mo"],
    [29030400, "mo", 2419200],
    [58060800, "1 y", "1 y"],
    [2903040000, "y", 29030400],
    [5806080000, "1 century", "1 century"],
    [58060800000, "centuries", 2903040000],
  ];

  const seconds = (Date.now() - time) / 1000;

  const listChoice = 1;

 

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
    return `${value} ${unit}`;
  }

  // Fallback for very large time differences
  const [, unit, divisor] = timeFormats[timeFormats.length - 1];
  const value = Math.floor(absSeconds / (divisor as number));
  return `${value} ${unit}`;
}
