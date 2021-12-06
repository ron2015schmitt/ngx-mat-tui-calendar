

import { NgxMatTuiCalendarModule } from 'ngx-mat-tui-calendar';

// Angular modules
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Design modules
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// project modules
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,

    MatIconModule,
    MatToolbarModule,

    NgxMatTuiCalendarModule,
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
