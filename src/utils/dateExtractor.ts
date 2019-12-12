import { DateObject } from '../components/NoteForm';

const extractDateComponents = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return { day, month, year, hours, minutes, seconds };
};

export default extractDateComponents;

export const dateSetter = (date: any) => {
  const currentDate = new Date();
  currentDate.setDate(date.day);
  currentDate.setMonth(date.month - 1);
  currentDate.setFullYear(date.year);
  currentDate.setHours(date.hours);
  currentDate.setMinutes(date.minutes);
  return currentDate;
};

export const dateValuesFormatter = (name: string, value: string) => {
  let numVal = value && parseInt(value.replace(/\D/gm, ''));
  if (name === 'day') {
    numVal = numVal === 0 ? 1 : numVal > 31 ? 31 : numVal;
  } else if (name === 'month') {
    numVal = numVal === 0 ? 1 : numVal > 12 ? 12 : numVal;
  } else if (name === 'year') {
    numVal = numVal > 50000 ? 2019 : numVal;
  } else if (name === 'hours') {
    numVal = numVal > 24 ? 24 : numVal;
  } else if (name === 'minutes') {
    numVal = numVal > 59 ? 59 : numVal;
  }

  return numVal.toString();
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const dateFormatter = (date: Date) => {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
