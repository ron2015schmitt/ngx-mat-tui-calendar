import { IOptions } from 'tui-calendar';



export interface CalendarOptions {
  ioptions: IOptions,
  darkMode: boolean,
  themeClass?: string,
  buttons: {
    previous?: boolean,
    next?: boolean,
    today?: boolean,
    longPrevious?: boolean,
    longNext?: boolean,
    month?: boolean,
    week?: boolean,
    day?: boolean,
  };
}



