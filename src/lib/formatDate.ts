// utils/formatDate.ts
export const formatDate = (isoDate?: string): string => {
  if (!isoDate) {
    return "";
  }
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  // Format the date using Intl.DateTimeFormat
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
