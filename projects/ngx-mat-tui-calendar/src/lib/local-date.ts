
// import { TZDate } from 'tui-calendar';

export class LocalDate {
  date: Date;

  // month = 1 to 12
  constructor(args) {
    let numbers;
    if (typeof args == 'string') {
      numbers = LocalDate.parse_YYYYMMDD(args);
    } else if (args instanceof LocalDate) {
      numbers = args.get();
    } else if (args instanceof Date) {
      numbers = LocalDate.convertDateToNumbers(args);
    } else if (typeof args.toDate === 'function') {
      numbers = LocalDate.convertDateToNumbers(args.toDate());
    } else if (args['_date'] instanceof Date ) {
      numbers = LocalDate.convertDateToNumbers(args['_date']);
    } else if (args instanceof Object) {
      numbers = args;
    }
    this.date = LocalDate.convertNumbersToDate(numbers);
  }

  static convertToJsDate(args) {
    return (new LocalDate(args)).toDate();
  }


  // return new LocalDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  static parse_YYYYMMDD(str) {
    // yyyy-mm-dd
    const regexp = /^(\d\d\d\d)-(\d\d)-(\d\d)/g;
    let matches = Array.from(
      str.matchAll(regexp), m => ({
        year: Number(m[1]),
        month: Number(m[2]),
        day: Number(m[3])
      })
    );
    if (matches.length != 1) {
      console.error(`dateIn: unknown date format: ${str}`);
      return null;
    }
    return matches[0];
  }
  static convertNumbersToDate({ year, month, day, hours, minutes, seconds, milliseconds }) {
    // month = 1 to 12
    // start with today's *local* date. this is really important
    let date = new Date();
    date.setDate(1); // very important
    date.setFullYear(year);
    date.setMonth((month==null) ? 0 : month - 1);
    date.setDate((day==null) ? 1 : day);
    date.setHours((hours==null) ? 0 : hours);
    date.setMinutes((minutes==null) ? 0 : minutes);
    date.setSeconds((seconds==null) ? 0 : seconds);
    date.setMilliseconds((milliseconds==null) ? 1 : milliseconds);
    return date;
  }


  static convertDateToNumbers(date) {
    // month = 1 to 12
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds(),
    };
  }

  get() {
    return LocalDate.convertDateToNumbers(this.date);
  }

  toMsgFormat() {
    return this.toYYYYMMDD();
  }
  toYYYYMMDD() {
    // yyyy-mm-dd

    let yyyy = this.date.getFullYear();
    let mm = (this.date.getMonth() + 1).toString().padStart(2, '0');
    let dd = (this.date.getDate()).toString().padStart(2, '0');
    let str = `${yyyy}-${mm}-${dd}`;
    // console.warn(`date=${str}=${this.toDisplayFormat()}`);
    return str;
  }
  toDisplayDateFormat() {
    return this.date.toLocaleDateString("en-US", {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  toDisplayFormat() {
    return this.date.toString();
  }
  toDate() {
    return this.date;
  }
  clearTime() {
    this.date.setHours(0, 0, 0, 1);
  }

}

