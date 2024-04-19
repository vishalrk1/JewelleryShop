export function convertDate(dateString: string): string {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.substring(0, 10).split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate: string = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
