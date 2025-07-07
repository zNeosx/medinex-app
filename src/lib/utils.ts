import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = ({
  dateString,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  locale = "fr-FR",
}: {
  dateString: Date | string;
  timeZone?: string;
  locale?: string;
}) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone: timeZone,
  };

  const dateLongOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timeZone,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
    timeZone: timeZone,
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: timeZone, // use the provided timezone
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    locale,
    dateTimeOptions,
  );
  const formattedDateLong: string = new Date(dateString).toLocaleString(
    locale,
    dateLongOptions,
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    locale,
    dateDayOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    locale,
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    locale,
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
    dateLong: formattedDateLong,
  };
};
