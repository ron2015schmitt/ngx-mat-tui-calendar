
// Angular modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

// Angular Material Design modules
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

// 3rd party modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTimepickerModule } from 'mat-timepicker';

// collect all of the above modules into an array
const importedModules = [
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    FlexModule, 
    FormsModule,
    HttpClientModule,
    OverlayModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatToolbarModule,

    FontAwesomeModule,
    MatTimepickerModule,
  ];


// project modules
import { NgxMatTuiCalendarComponent } from './ngx-mat-tui-calendar.component';
import { NgxMatTuiCalendarWrapperComponent } from './ngx-mat-tui-calendar-wrapper/ngx-mat-tui-calendar-wrapper.component';
import { NgxMatTuiCalendarEditorDialogComponent } from './ngx-mat-tui-calendar-editor-dialog/ngx-mat-tui-calendar-editor-dialog.component';

const projectModules = [
    NgxMatTuiCalendarComponent,
    NgxMatTuiCalendarWrapperComponent,
    NgxMatTuiCalendarEditorDialogComponent,
];


@NgModule({
  declarations: [
    ...projectModules,
  ],
  imports: [
    ...importedModules,
  ],
  exports: [
    ...importedModules,

    ...projectModules,
  ],
  entryComponents: [
    ...projectModules,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgxMatTuiCalendarModule { }
