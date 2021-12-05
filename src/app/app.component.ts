import { Component, ElementRef, EventEmitter, HostBinding, OnInit, Output, ViewChild } from '@angular/core';
import { IOptions, ISchedule, IWeekOptions } from 'tui-calendar';
import { NgxMatTuiCalendarComponent, LocalDate, CalendarOptions } from 'ngx-mat-tui-calendar';

import { environment } from '../environments/environment';
import { FormControl } from '@angular/forms';

import { Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  prod = environment.production;
  title = "Angular Material TOAST UI Calendar Demo";

  darkMode: boolean = false; // <- initial setting for slider
  toggleControl = new FormControl(this.darkMode);
  @HostBinding() themeClass = '';
  @ViewChild('matTuiCalendarNgx', { static: true }) calendarComponent: NgxMatTuiCalendarComponent;

  // Initial Options
  // see definition of IOptions for the full list
  options: CalendarOptions = {
    ioptions: {
      defaultView: 'month',
      taskView: true,
      month: {
        narrowWeekend: false,
      },
      week: {
        narrowWeekend: false,
        hourStart: 7,
        hourEnd: 20,
      } as IWeekOptions,
    } as IOptions,
    darkMode: this.darkMode,
    themeClass: this.themeClass,
  } as CalendarOptions;

  // in lieu of a back-end database, a Map is used for demo purposes
  schedules: Map<string, ISchedule> = new Map();


  constructor(private overlay: Overlay) {
    this.overlay.create();
    this.setDarkMode(this.darkMode);
  }



  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.setDarkMode(darkMode);
    });
  }

  setDarkMode(darkMode: boolean) {
    this.darkMode = darkMode;
    const oldThemeClass = this.themeClass;
    this.themeClass = this.darkMode ? 'dark-theme' : 'light-theme';
    let options = {...this.options};
    options.darkMode = this.darkMode;
    options.themeClass = this.themeClass;

    // need the following work-around for popup components like mat-datepicker
    let els = document.getElementsByClassName("cdk-overlay-container");
    for (let i = 0; i < els.length; i++) {
      if (oldThemeClass) els[i].classList.remove(oldThemeClass);
      els[i].classList.add(this.themeClass);
    }
    this.options = options;
  }

  ngAfterViewInit() {
    // put in the initial schedules
    let schedules: ISchedule[] = this.getSomeSchedules();
    console.warn(this.calendarComponent)
    schedules = this.calendarComponent.createSchedules(schedules);
    for (let schedule of schedules) {
      this.schedules.set(schedule.id, schedule);
    }

    // -->code below here can be cut
    this.examples();


    // uncomment below to see calendar options change after 3 secs

    // setTimeout(() => {
    //   console.log("change options");
    //   // the following will cause ngOnChanges to fire even if shallow (ie top-level) properties not change
    //   let options = { ...this.options };
    //   options.ioptions.month.narrowWeekend = true;
    //   options.ioptions.week.narrowWeekend = true;
    //   this.options = options;
    // }, 3000);
    
    // <---code above here can be cut

  }

  examples() {

    // create a new schedule
    let schedule: ISchedule = {
      title: "Tournament",
      start: new Date(new Date()),
      end: new Date(new Date()),
      isAllDay: true,
      category: 'allday',
    } as ISchedule;
    // the same schedule but with other props, including id, is returned
    schedule = this.calendarComponent.createSchedule(schedule);
    this.schedules.set(schedule.id, schedule);


    // modify and update this schedule
    let end = LocalDate.convertToJsDate(schedule.end);
    end.setDate(end.getDate() + 1);
    schedule.end = end;
    this.calendarComponent.updateSchedule(schedule);
    schedule = this.calendarComponent.getSchedule({ id: schedule.id, calendarId: null });
    this.schedules.set(schedule.id, schedule);


    // delete this schedule (note: schedule ids are unique)
    this.calendarComponent.deleteSchedule({ id: schedule.id, calendarId: null });
    this.schedules.delete(schedule.id);


    // delete all schedules
    this.calendarComponent.deleteAllSchedules();
    this.schedules.clear();


    // restore sample schedules
    let schedules: ISchedule[] = this.getSomeSchedules();
    schedules = this.calendarComponent.createSchedules(schedules);
    for (let schedule of schedules) {
      this.schedules.set(schedule.id, schedule);
    }

  }



  onUserCreatedSchedule(schedule: ISchedule) {
    console.log(`onUserCreatedSchedule: id=${schedule.id}:`, schedule);
    this.schedules.set(schedule.id, schedule);
  }

  onUserUpdatedSchedule(schedule: ISchedule) {
    console.log(`onUserUpdatedSchedule: id=${schedule.id}:`, schedule);
    this.schedules.set(schedule.id, schedule);
  }

  onUserDeletedSchedule(args: { id: string, calendarId: string }) {
    console.log(`onUserDeletedSchedule: id=${args.id}`);
    this.schedules.delete(args.id);
  }


  getSomeSchedules(): ISchedule[] {
    const now = new Date();
    let schedules: ISchedule[] = [];
    schedules.push({
      title: "Dad's Birthday",
      start: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      end: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      isAllDay: true,
      category: 'allday',
    } as ISchedule);
    schedules.push({
      title: "Vacation",
      start: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
      end: new Date(now.getTime() + 11 * 24 * 60 * 60 * 1000),
      isAllDay: true,
      category: 'allday',
    } as ISchedule);

    let doctor_start = new Date();
    doctor_start.setHours(15, 30, 0, 0);
    let doctor_end = new Date(doctor_start);
    doctor_end.setHours(16, 0, 0, 0);
    schedules.push({
      title: "Doctor",
      start: doctor_start,
      end: doctor_end,
      isAllDay: false,
      category: 'time',
      dueDateClass: '',
    } as ISchedule);

    let dentist_start = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    dentist_start.setHours(13, 0, 0, 0);
    let dentist_end = new Date(dentist_start);
    dentist_end.setHours(14, 0, 0, 0);
    schedules.push({
      title: "Dentist",
      start: dentist_start,
      end: dentist_end,
      isAllDay: false,
      category: 'time',
      dueDateClass: '',
    } as ISchedule);

    return schedules;
  }


}

