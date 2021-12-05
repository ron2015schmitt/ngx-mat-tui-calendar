import { Component, ViewChild, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import distinctColors from 'distinct-colors';
import { Color } from "chroma-js";
import { v4 as uuidv4 } from 'uuid';

import {
  faCalendarCheck,
  faCaretSquareLeft,
  faCaretSquareRight,
  faTable,
  faColumns,
  faList,
  faListAlt,
  faForward,
  faFastBackward,
  faBackward,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  default as Calendar,
  ICalendarInfo,
  IEventDateObject,
  IEventMoreObject,
  IEventObject,
  IEventScheduleObject,
  IOptions,
  ISchedule,
  ITheme,
  ITimezone,
  IWeekOptions,
  TEventBeforeCreateSchedule,
  TZDate,
} from 'tui-calendar';

// project 
import { LocalDate } from './local-date.js';
import { NgxMatTuiCalendarEditorDialogComponent } from './ngx-mat-tui-calendar-editor-dialog/ngx-mat-tui-calendar-editor-dialog.component';
import { CalendarOptions } from './calendar-options';
import { CalendarEditorOptions } from './calendar-editor-options';

@Component({
  selector: 'ngx-mat-tui-calendar',
  templateUrl: './ngx-mat-tui-calendar.component.html',
  styleUrls: [
    './ngx-mat-tui-calendar.component.scss'
  ],
})
export class NgxMatTuiCalendarComponent implements OnInit, OnChanges, OnDestroy {
  iconToday = faCalendarCheck;
  // iconPrev = faCaretSquareLeft;
  // iconNext = faCaretSquareRight;
  iconPrev = faCaretLeft;
  iconNext = faCaretRight;
  iconLongPrev = faBackward;
  iconLongNext = faForward;
  iconByMonth = faTable;
  iconByWeek = faColumns;
  iconByDay = faListAlt;

  calendar: Calendar;  // the TUI Calendar Object
  calendarId: string;
  colors: Color[];
  colorIndex: number;
  @Output() userCreatedSchedule: EventEmitter<ISchedule> = new EventEmitter();
  @Output() userUpdatedSchedule: EventEmitter<ISchedule> = new EventEmitter();
  @Output() userDeletedSchedule: EventEmitter<ISchedule> = new EventEmitter();
  @Input() options: CalendarOptions;
  appliedOptions: CalendarOptions; // this is needed for when options is not connected

  constructor(private dialog: MatDialog) {
    // we slice off the first color since it is gray
    this.colors = distinctColors({ lightMin: 70, count: 15 }).slice(1);
    this.colorIndex = 0;
    this.calendarId = uuidv4();

    this.appliedOptions = this.getDefaultOptions();
  }

  ngOnInit() {
    console.warn(`calendar.component.ts: ngOnit`)
    this.createTUICalendar();
    this.bindCallbacks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes);
    if (this.calendar) {

      if (changes.options) {
        console.warn(`change.option:`, changes.options);
        let options = changes.options.currentValue;
        this.setOptions(options);
      }
    }

  }

  ngOnDestroy() {
    this.calendar.destroy();
  }

  onCalendarLongPrev() {
    let date: Date = (this.calendar.getDate() as TZDate).toDate();
    let days = 0;
    let months = 0;
    let years = 0;
    switch (this.calendar.getViewName()) {
      case 'day':
        days = -7;
        break;
      case 'week':
        days = -28;
        break;
      case 'month':
        years = -1;
        break;
    }
    date.setFullYear(date.getFullYear() + years);
    date.setMonth(date.getMonth() + months);  // date class does the modular arithmetic
    date.setDate(date.getDate() + days);  // date class does the modular arithmetic
    this.calendar.setDate(date);
  }

  onCalendarPrev() {
    this.calendar.prev();
  }

  onCalendarToday() {
    this.calendar.today();
  }

  onCalendarNext() {
    this.calendar.next();
  }

  onCalendarLongNext() {
    let date: Date = (this.calendar.getDate() as TZDate).toDate();
    let days = 0;
    let months = 0;
    let years = 0;
    switch (this.calendar.getViewName()) {
      case 'day':
        days = 7;
        break;
      case 'week':
        days = 28;
        break;
      case 'month':
        years = 1;
        break;
    }
    date.setFullYear(date.getFullYear() + years);
    date.setMonth(date.getMonth() + months);  // date class does the modular arithmetic
    date.setDate(date.getDate() + days);  // date class does the modular arithmetic
    this.calendar.setDate(date);
  }


  onMonthView() {
    this.calendar.changeView('month');
  }

  onWeekView() {
    this.calendar.changeView('week');
  }

  onDayView() {
    this.calendar.changeView('day');
  }


  getDate() {
    let date = this.calendar.getDate();
    let str = date.toDate().toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
    });
    return str;
  }

  createTUICalendar() {
    let ioptions = this.preprocessIOptions(null);
    console.warn(`calendar.component.ts: createTUICalendar: ioptions:`, ioptions);
    this.calendar = new Calendar('#calendar', ioptions);
    console.warn(`calendar.component.ts: createTUICalendar: this.calendar:`, this.calendar);
  }


  bindCallbacks() {
    this.bindAfterRenderSchedule();
    this.bindClickTimezonesCollapseBtn();
    this.bindClickDayname();
    this.bindClickMore();
    this.bindClickSchedule();
    this.bindBeforeCreateSchedule();
    this.bindBeforeUpdateSchedule();
    this.bindBeforeDeleteSchedule();
  }

  bindAfterRenderSchedule() {
    let that = this;
    this.calendar.on('afterRenderSchedule', function (event: { schedule: ISchedule }) {
      // console.warn(`afterRenderSchedule`, event);
    });
  }

  bindClickTimezonesCollapseBtn() {
    let that = this;
    this.calendar.on('clickTimezonesCollapseBtn', function (timezonesCollapsed: boolean) {
      // console.warn(`clickTimezonesCollapseBtn`, timezonesCollapsed);
    });
  }


  bindClickDayname() {
    let that = this;
    this.calendar.on('clickDayname', function (event: IEventDateObject) {
      // console.warn(`clickDayname`, event);
    });
  }

  bindClickMore() {
    let that = this;
    this.calendar.on('clickMore', function (event: IEventMoreObject) {
      // console.warn(`clickMore`, event);
    });
  }

  bindClickSchedule() {
    // only works if useDetailPopup: false,
    let that = this;
    this.calendar.on('clickSchedule', function (event: IEventScheduleObject) {
      // console.warn(`clickSchedule`, event);
      let schedule: ISchedule = { ...event.schedule };
      schedule.start = (new LocalDate(schedule.start)).toDate();
      schedule.end = (new LocalDate(schedule.end)).toDate();
      that.openPopupScheduleEditor(schedule);
    });
  }

  bindBeforeCreateSchedule() {
    let that = this;
    this.calendar.on('beforeCreateSchedule', function (event: TEventBeforeCreateSchedule) {
      // console.log(`beforeCreateSchedule`, event);
      let start: Date = (new LocalDate(event.start)).toDate();
      start.setHours(9);
      let end: Date = (new LocalDate(event.end)).toDate();
      end.setHours(10);
      that.openPopupScheduleEditor({
        title: '',
        start: start,
        end: end,
        id: null,
      } as ISchedule);
    });
  }

  bindBeforeUpdateSchedule() {
    let that = this;
    this.calendar.on('beforeUpdateSchedule', function (event: IEventObject) {
      // console.log(`beforeUpdateSchedule`, event);
      that.updateScheduleAndNotifyParent(event);
    });
  }

  bindBeforeDeleteSchedule() {
    let that = this;
    this.calendar.on('beforeDeleteSchedule', function (event: IEventScheduleObject) {
      // console.log(`beforeDeleteSchedule`, event.schedule);
      // console.log(`beforeDeleteSchedule`, event.schedule);
      that.deleteScheduleAndNotifyParent({ id: event.schedule.id, calendarId: event.schedule.calendarId });
    });
  }

  nextColor() {
    let color = this.colors[this.colorIndex++].hex();
    if (this.colorIndex >= this.colors.length) this.colorIndex = 0;
    return color;
  }

  createScheduleAndNotifyParent(args: ISchedule) {
    let schedule = this.createSchedule(args);
    this.userCreatedSchedule.emit(schedule);
    return schedule;
  }

  createSchedules(schedules: ISchedule[]) {
    let newSchedules = [];
    for (let schedule of schedules) {
      newSchedules.push(this.createSchedule(schedule));
    }
    return newSchedules;
  }

  createSchedule(args: ISchedule): ISchedule {
    // if (form.invalid) return;

    // create a color
    let color = this.nextColor();
    // console.log(color);

    // create an id
    let id = (args.id == null) ? '' : args.id.toString();
    if (id.length === 0) {
      id = uuidv4();
    }

    let start: Date = LocalDate.convertToJsDate(args.start);
    let end: Date = LocalDate.convertToJsDate(args.end);

    let schedule: ISchedule = {
      id,
      calendarId: (args.calendarId == null) ? this.calendarId : args.calendarId,
      title: args.title,
      start: start,
      end: end,
      category: args.category,
      isAllDay: args.isAllDay,
      dueDateClass: '',
      bgColor: color,
    } as ISchedule
    // console.log(`event-calendar.component.ts: createEvent:`, schedule);
    this.calendar.createSchedules([schedule]);
    return this.calendar.getSchedule(schedule.id, schedule.calendarId);
  }

  updateScheduleAndNotifyParent(args: ISchedule) {
    let schedule = this.updateSchedule(args);
    this.userUpdatedSchedule.emit(schedule);
    return schedule;
  }

  updateSchedule(schedule: ISchedule) {
    // console.log(`event-calendar.component.ts: updateSchedule:`, schedule);
    let calendarId = (schedule.calendarId == null) ? this.calendarId : schedule.calendarId;
    this.calendar.updateSchedule(schedule.id, calendarId, schedule, false);
    return this.calendar.getSchedule(schedule.id, calendarId);
  }

  getSchedule(args: { id: string, calendarId: string }) {
    // console.log(`event-calendar.component.ts: getSchedule:`, schedule);
    let calendarId = (args.calendarId == null) ? this.calendarId : args.calendarId;
    return this.calendar.getSchedule(args.id, calendarId);
  }

  deleteScheduleAndNotifyParent(args: { id: string, calendarId: string }) {
    this.deleteSchedule(args);
    let calendarId = (args.calendarId == null) ? this.calendarId : args.calendarId;
    this.userDeletedSchedule.emit({ id: args.id, calendarId });
  }

  deleteSchedule(args: { id: string, calendarId: string }) {
    // console.log(`event-calendar.component.ts: deleteSchedule:`, schedule);
    let calendarId = (args.calendarId == null) ? this.calendarId : args.calendarId;
    this.calendar.deleteSchedule(args.id, calendarId, false);
  }

  deleteAllSchedules() {
    this.calendar.clear();
  }

  openPopupScheduleEditor(schedule: ISchedule) {
    // console.log('openPopupScheduleEditor: calevent:', schedule);
    const dialogConfig = new MatDialogConfig();
    if (this.appliedOptions.themeClass) {
      dialogConfig.panelClass = this.appliedOptions.themeClass;
    }
    console.warn(`options: `, this.appliedOptions);
    dialogConfig.data = { schedule, darkMode: this.appliedOptions.darkMode, themeClass: this.appliedOptions.themeClass } as CalendarEditorOptions;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(NgxMatTuiCalendarEditorDialogComponent, dialogConfig);
    // const dialogRef = this.dialog.open(NgxMatTuiCalendarScheduleEditorDialogComponent, {
    //   data: schedule,
    // });
    dialogRef.afterClosed().subscribe((result: { schedule: ISchedule, performDelete: boolean }) => {
      // console.log('openPopupScheduleEditor: The dialog was closed', result);
      this.calendar.render(true);  // <-- so that selection is cleared
      if (result && result.schedule) {
        let schedule = result.schedule;
        if (result.performDelete == true) {
          // delete
          // console.log(`openPopupScheduleEditor:afterCLosed: deleteSchedule`);
          this.deleteScheduleAndNotifyParent({ id: schedule.id, calendarId: schedule.calendarId });
        } else if (schedule.id == null) {
          // console.log(`openPopupScheduleEditor:afterCLosed: addSchedule`);
          this.createScheduleAndNotifyParent(schedule);
        } else {
          // console.log(`openPopupScheduleEditor:afterCLosed: updateSchedule`);
          this.updateScheduleAndNotifyParent(schedule);
        }
      }
    });
  }


  setOptions(options: CalendarOptions) {
    if (options == null) {
      options = this.getDefaultOptions();
    }
    options.ioptions = this.setIOptions(options.ioptions);
    this.appliedOptions = {...options};
  }

  setIOptions(ioptionsIn: IOptions) {
    let ioptions = this.preprocessIOptions(ioptionsIn);
    this.calendar.setOptions(ioptions);
    this.calendar.setTheme(ioptions.theme);
    this.calendar.render(true);
    return ioptions;
  }

  preprocessIOptions(ioptions: IOptions): IOptions {
    let defs: IOptions = this.getDefaultIOptions();
    if (ioptions == null) {
      ioptions = defs;
    } else {
      ioptions = { ...defs, ...ioptions };
    }
    ioptions.useCreationPopup = false;
    ioptions.useDetailPopup = false;
    if (!ioptions.theme) {
      ioptions.theme = this.getDefaultTheme();
    }
    return ioptions;
  }


  getDefaultOptions(): CalendarOptions {
    return {
      darkMode: false,
      themeClass: null,
      ioptions: this.getDefaultIOptions(),
    } as CalendarOptions;
  }

  getDefaultIOptions(): IOptions {
    return {
      defaultView: 'month',
      taskView: true,
      useCreationPopup: false,
      useDetailPopup: false,
      theme: this.getDefaultTheme(),
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
      },
      week: {
        // startDayOfWeek: undefined,
        // daynames: undefined,
        narrowWeekend: false,
        // workweek: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true,
        hourStart: 7,
        hourEnd: 20,
      } as IWeekOptions,
    } as IOptions;

  }

  getColor(name: string): string {
    const el = document.getElementById(`theme-${name}`);
    if (el) {
      const style = window.getComputedStyle(el, null);
      console.warn(`color:`, style.color);
      return style.color;
    }
    return '';
  }

  getDefaultTheme(): ITheme {
    function adjustHexOpacity(color, opacity) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
    }

    // default keys and styles
    // TODO: apply Material Design Theme 
    let background = this.getColor("background");
    let border = this.getColor("divider");
    let borderLight = this.getColor("divider-light");
    let shadow = this.getColor("divider");
    let highlight = this.getColor("highlight");
    let primary = this.getColor("primary");
    let warn = this.getColor("warn");
    let text = this.getColor("foreground");
    let primaryShaded = this.getColor("primary-shaded");

    // tui-full-calendar-weekday-schedule-title
    //calendar-week-dayname-name
    return {
      'common.border': `1px solid ${border}`,
      'common.backgroundColor': background,
      'common.holiday.color': warn,
      'common.saturday.color': text,
      'common.dayname.color': text,
      'common.today.color': '#0f0',

      // creation guide style
      'common.creationGuide.backgroundColor': primaryShaded,
      'common.creationGuide.border': `1px solid ${highlight}`,

      // month header 'dayname'
      'month.dayname.height': '31px',
      'month.dayname.borderLeft': `1px solid ${border}`,
      'month.dayname.paddingLeft': '10px',
      'month.dayname.paddingRight': '10px',
      'month.dayname.backgroundColor': 'inherit',
      'month.dayname.fontSize': '12px',
      'month.dayname.fontWeight': 'normal',
      'month.dayname.textAlign': 'left',

      // month day grid cell 'day'
      'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
      'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
      'month.weekend.backgroundColor': 'inherit',
      'month.day.fontSize': '14px',
      'month.schedule.color': highlight,

      // month schedule style
      'month.schedule.borderRadius': '2px',
      'month.schedule.height': '24px',
      'month.schedule.marginTop': '2px',
      'month.schedule.marginLeft': '8px',
      'month.schedule.marginRight': '8px',

      // month more view
      'month.moreView.border': `1px solid ${border}`,
      'month.moreView.boxShadow': `0 2px 6px 0 ${shadow}`,
      'month.moreView.backgroundColor': background,
      'month.moreView.paddingBottom': '17px',
      'month.moreViewTitle.height': '44px',
      'month.moreViewTitle.marginBottom': '12px',
      'month.moreViewTitle.backgroundColor': 'inherit',
      'month.moreViewTitle.borderBottom': 'none',
      'month.moreViewTitle.padding': '12px 17px 0 17px',
      'month.moreViewList.padding': '0 17px',

      // week header 'dayname'
      'week.dayname.height': '42px',
      'week.dayname.borderTop': `1px solid ${border}`,
      'week.dayname.borderBottom': `1px solid ${border}`,
      'week.dayname.borderLeft': 'inherit',
      'week.dayname.paddingLeft': '0',
      'week.dayname.backgroundColor': 'inherit',
      'week.dayname.textAlign': 'left',
      'week.today.color': text,
      'week.pastDay.color': borderLight,

      // week vertical panel 'vpanel'
      'week.vpanelSplitter.border': `1px solid ${border}`,
      'week.vpanelSplitter.height': '3px',

      // week daygrid 'daygrid'
      'week.daygrid.borderRight': `1px solid ${border}`,
      'week.daygrid.backgroundColor': background,

      'week.daygridLeft.width': '72px',
      'week.daygridLeft.backgroundColor': background,
      'week.daygridLeft.paddingRight': '8px',
      'week.daygridLeft.borderRight': `1px solid ${border}`,


      'week.today.backgroundColor': primaryShaded,
      'week.weekend.backgroundColor': 'inherit',

      // week timegrid 'timegrid'
      'week.timegridLeft.width': '72px',
      'week.timegridLeft.backgroundColor': 'inherit',
      'week.timegridLeft.borderRight': `1px solid ${border}`,
      'week.timegridLeft.fontSize': '11px',
      'week.timegridLeftTimezoneLabel.height': '40px',
      'week.timegridLeftAdditionalTimezone.backgroundColor': background,

      'week.timegridOneHour.height': '52px',
      'week.timegridHalfHour.height': '26px',
      'week.timegridHalfHour.borderBottom': 'none',
      'week.timegridHorizontalLine.borderBottom': `1px solid ${border}`,

      'week.timegrid.paddingRight': '8px',
      'week.timegrid.borderRight': `1px solid ${border}`,
      'week.timegridSchedule.borderRadius': '2px',
      'week.timegridSchedule.paddingLeft': '2px',

      // #515ce6 is a slate blue

      'week.currentTime.color': highlight,
      'week.currentTime.fontSize': '11px',
      'week.currentTime.fontWeight': 'normal',

      'week.pastTime.color': borderLight,
      'week.pastTime.fontWeight': 'normal',

      'week.futureTime.color': border,
      'week.futureTime.fontWeight': 'normal',

      'week.currentTimeLinePast.border': `1px dashed ${highlight}`,
      'week.currentTimeLineBullet.backgroundColor': highlight,
      'week.currentTimeLineToday.border': `1px solid ${highlight}`,
      'week.currentTimeLineFuture.border': 'none',

      // week creation guide style
      'week.creationGuide.color': highlight,
      'week.creationGuide.fontSize': '11px',
      'week.creationGuide.fontWeight': 'bold',

      // week daygrid schedule style
      'week.dayGridSchedule.borderRadius': '2px',
      'week.dayGridSchedule.height': '24px',
      'week.dayGridSchedule.marginTop': '2px',
      'week.dayGridSchedule.marginLeft': '8px',
      'week.dayGridSchedule.marginRight': '8px'
    } as ITheme;
  }

}
