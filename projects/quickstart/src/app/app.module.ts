import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMatTuiCalendarModule } from 'ngx-mat-tui-calendar';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMatTuiCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
