import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function ucFirst(value: any) {
  if (!value) {
    return value;
  }

  return value[0].toUpperCase() + value.slice(1);
}

export function getFormatDate(value: string, locale: string) {
  return dayjs(value).locale(locale).format('DD MMMM YYYY');
}

export function getFormatJobDate(value: string, locale: string) {
  return dayjs(value).locale(locale).format('MMMM YYYY');
}

export function getDiffJobDate(start: string, end: string, locale: string) {
  return dayjs(start).locale(locale).from(end, true);
}
