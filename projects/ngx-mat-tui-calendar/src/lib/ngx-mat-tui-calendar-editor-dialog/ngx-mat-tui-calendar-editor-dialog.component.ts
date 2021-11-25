import { Component, ElementRef, HostBinding, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DateType, default as Calendar, IEventScheduleObject, ISchedule, TZDate } from 'tui-calendar';

import { LocalDate } from '../local-date.js';
import { CalendarEditorOptions } from '../calendar-editor-options';


@Component({
  selector: 'ngx-mat-tui-calendar-editor-dialog',
  templateUrl: './ngx-mat-tui-calendar-editor-dialog.component.html',
  styleUrls: ['./ngx-mat-tui-calendar-editor-dialog.component.scss']
})
export class NgxMatTuiCalendarEditorDialogComponent implements OnInit {
  private id: string;
  titleStr: string = '';
  locationStr: string = '';
  closed: boolean = false;
  eventForm: FormGroup;
  date: Date;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  isAllDay: boolean = false;
  color: string;
  themeClass: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CalendarEditorOptions,
    private dialogRef: MatDialogRef<NgxMatTuiCalendarEditorDialogComponent>,
  ) {
    // console.log('NgxMatTuiCalendarEditorDialogComponent.constructor: schedule:', schedule);

    console.log('NgxMatTuiCalendarEditorDialogComponent.constructor: data:', data);
    this.color = data.darkMode ? 'accent' : 'primary';

    const schedule = data.schedule;
    if (schedule == null) {
      this.id = null;
    } else {
      if (schedule.id) {
        this.id = schedule.id.toString();
      }
    }
    this.titleStr = (schedule.title) ? schedule.title.toString() : '';
    this.locationStr = (schedule.location) ? schedule.location.toString() : '';


    this.isAllDay = (schedule.isAllDay == true);

    this.startDate = LocalDate.convertToJsDate(schedule.start) as Date;
    this.endDate = LocalDate.convertToJsDate(schedule.end) as Date;

    this.startTime = new Date(this.startDate);
    this.endTime = new Date(this.endDate);
    this.startDate.setHours(0, 0, 0, 1);
    this.endDate.setHours(0, 0, 0, 1);

    this.eventForm = new FormGroup(
      {
        title: new FormControl(this.titleStr),
        location: new FormControl(this.locationStr),
        scheduleType: new FormControl((schedule.isAllDay == true) ? "all-day" : "time-slot"),
        start: new FormControl(this.startDate),
        end: new FormControl(this.endDate),
        date: new FormControl(this.startDate),
        time1: new FormControl(this.startTime),
        time2: new FormControl(this.endTime, [Validators.required]),
      },
      this.getDateValidator(),
    );

  }

  getDateValidator() {
    const validator: ValidatorFn = (group: FormGroup): { [key: string]: any } => {
      const scheduleType = group.get("scheduleType").value;
      if (group.get("scheduleType").value == "time-slot") {
        let time1 = group.get("time1").value;
        let time2 = group.get("time2").value;
        if (time1 >= time2) {
          return {
            dates: "End time must be later than the start time"
          };
        }
      }
      return {};
    };
    return validator;
  }


  ngOnInit(): void {
    // console.dir(`Dialog config: ${this.dialogConfig}`);
    // let start: Date = (LocalDate.convertToJsDate(this.schedule.start)).toDate();
    // let end: Date = (LocalDate.convertToJsDate(this.schedule.end)).toDate();
    // this.eventForm.get("date").setValue(start);
    // this.eventForm.get("start").setValue(start);
    // this.eventForm.get("end").setValue(end);

  }



  onSave(form: NgForm) {
    // console.log(`onSave form.invalid=${form.invalid}; this.closed=${this.closed} this.titleStr=${this.titleStr}`);
    if (form.invalid || this.closed) return;
    let schedule = this.data.schedule;
    schedule.title = this.eventForm.get("title").value;
    schedule.location = this.eventForm.get("location").value;
    schedule.isAllDay = this.isAllDay;
    schedule.category = this.isAllDay ? 'allday' : 'time';  // CATEGORY MUST BE DEFINED: 'milestone', 'task', allday', 'time'
    if (this.isAllDay) {
      schedule.start = LocalDate.convertToJsDate(this.eventForm.get("start").value) as Date;
      schedule.start.setHours(0, 0, 0, 1);
      schedule.end = LocalDate.convertToJsDate(this.eventForm.get("end").value) as Date;
      schedule.end.setHours(0, 0, 0, 1);
    } else {
      this.startTime = LocalDate.convertToJsDate(this.eventForm.get("time1").value) as Date;
      schedule.start = LocalDate.convertToJsDate(this.eventForm.get("date").value) as Date;
      schedule.start.setHours(
        this.startTime.getHours(),
        this.startTime.getMinutes(),
        this.startTime.getSeconds(),
        this.startTime.getMilliseconds(),
      );
      this.endTime = LocalDate.convertToJsDate(this.eventForm.get("time2").value) as Date;
      schedule.end = LocalDate.convertToJsDate(this.eventForm.get("date").value) as Date;
      schedule.end.setHours(
        this.endTime.getHours(),
        this.endTime.getMinutes(),
        this.endTime.getSeconds(),
        this.endTime.getMilliseconds(),
      );
    }
    // console.log(`pop-up-event-editor.component.ts: user clicked SAVE event=${schedule}`);
    // this.eventOutput.emit(schedule);
    form.resetForm();
    this.closeMe(schedule);
  }

  onCancel() {
    // this.cancelled.emit();
    // console.log('openPopupScheduleEditor: user clicked CANCEL');
    this.closeMe(null);
  }

  onDelete() {
    // this.cancelled.emit();
    // console.log('openPopupScheduleEditor: user clicked DELETE');
    this.closeMe(this.data.schedule, true);
  }


  closeMe(schedule: ISchedule, performDelete?: boolean) {
    // console.log('closeMe: The dialog is closing', schedule);
    this.closed = true;
    this.dialogRef.close({ schedule, performDelete: (performDelete == true) });
  }

  log(str) {
    console.warn(str);
  }

  onUseAllDay() {
    this.isAllDay = true;
  }
  onUseTimeSlot() {
    this.isAllDay = false;
  }

}
