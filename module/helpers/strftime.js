const DEFAULT_OPTIONS = {
    meridian: { am: "AM", pm: "PM" },
    day_names: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ],
    abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    month_names: [
        null,
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    abbr_month_names: [
        null,
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
};
export function strftime(date, format, options = DEFAULT_OPTIONS) {
    options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    if (isNaN(date.getTime())) {
        throw new Error("strftime() requires a valid date object, but received an invalid date.");
    }
    const weekDay = date.getDay();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const hour = date.getHours();
    let hour12 = hour;
    const meridian = hour > 11 ? "pm" : "am";
    const secs = date.getSeconds();
    const mins = date.getMinutes();
    const offset = date.getTimezoneOffset();
    const absOffsetHours = Math.floor(Math.abs(offset / 60));
    const absOffsetMinutes = Math.abs(offset) - absOffsetHours * 60;
    const timezoneoffset = (offset > 0 ? "-" : "+") +
        (absOffsetHours.toString().length < 2
            ? "0" + absOffsetHours
            : absOffsetHours) +
        (absOffsetMinutes.toString().length < 2
            ? "0" + absOffsetMinutes
            : absOffsetMinutes);
    if (hour12 > 12) {
        hour12 = hour12 - 12;
    }
    else if (hour12 === 0) {
        hour12 = 12;
    }
    format = format.replace("%a", options.abbr_day_names[weekDay]);
    format = format.replace("%A", options.day_names[weekDay]);
    format = format.replace("%b", options.abbr_month_names[month]);
    format = format.replace("%B", options.month_names[month]);
    format = format.replace("%d", day.toString().padStart(2, "0"));
    format = format.replace("%e", day.toString());
    format = format.replace("%-d", day.toString());
    format = format.replace("%H", hour.toString().padStart(2, "0"));
    format = format.replace("%-H", hour.toString());
    format = format.replace("%k", hour.toString());
    format = format.replace("%I", hour12.toString().padStart(2, "0"));
    format = format.replace("%-I", hour12.toString());
    format = format.replace("%l", hour12.toString());
    format = format.replace("%m", month.toString().padStart(2, "0"));
    format = format.replace("%-m", month.toString());
    format = format.replace("%M", mins.toString().padStart(2, "0"));
    format = format.replace("%-M", mins.toString());
    format = format.replace("%p", options.meridian[meridian]);
    format = format.replace("%P", options.meridian[meridian].toLowerCase());
    format = format.replace("%S", secs.toString().padStart(2, "0"));
    format = format.replace("%-S", secs.toString());
    format = format.replace("%w", weekDay.toString());
    format = format.replace("%y", year
        .toString()
        .padStart(2, "0")
        .substr(-2));
    format = format.replace("%-y", year
        .toString()
        .padStart(2, "0")
        .substr(-2)
        .replace(/^0+/, ""));
    format = format.replace("%Y", year.toString());
    format = format.replace(/%z/i, timezoneoffset);
    return format;
}
