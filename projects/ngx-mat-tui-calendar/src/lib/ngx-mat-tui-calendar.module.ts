import { NgModule } from '@angular/core';
import { NgxMatTuiCalendarComponent } from './ngx-mat-tui-calendar.component';
import { NgxMatTuiCalendarWrapperComponent } from './ngx-mat-tui-calendar-wrapper/ngx-mat-tui-calendar-wrapper.component';

@NgModule({
  declarations: [
    NgxMatTuiCalendarComponent,
    NgxMatTuiCalendarWrapperComponent,
  ],
  imports: [
  ],
  exports: [
    NgxMatTuiCalendarComponent,
  ],
  entryComponents: [
    NgxMatTuiCalendarComponent,
  ],
})
export class NgxMatTuiCalendarModule { }
