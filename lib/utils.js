import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import "dayjs/locale/en";

dayjs.extend(relativeTime);

export function ucFirst(value) {
  if (!value) return value;
  return value[0].toUpperCase() + value.slice(1);
}

export function getFormatDate(value, locale) {
  return dayjs(value).locale(locale).format("DD MMMM YYYY");
}

export function getFormatJobDate(value, locale) {
  return dayjs(value).locale(locale).format("MMMM YYYY");
}

export function getDiffJobDate(start, end, locale) {
  return dayjs(start).locale(locale).from(end, true);
}
