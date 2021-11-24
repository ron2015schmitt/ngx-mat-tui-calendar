import { NgModule } from '@angular/core';
import { NgxMatTuiCalendarComponent } from './ngx-mat-tui-calendar.component';
import { NgxMatTuiCalendarWrapperComponent } from './ngx-mat-tui-calendar-wrapper/ngx-mat-tui-calendar-wrapper.component';
import { NgxMatTuiCalendarEditorDialogComponent } from './ngx-mat-tui-calendar-editor-dialog/ngx-mat-tui-calendar-editor-dialog.component';

@NgModule({
  declarations: [
    NgxMatTuiCalendarComponent,
    NgxMatTuiCalendarWrapperComponent,
    NgxMatTuiCalendarEditorDialogComponent,
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
