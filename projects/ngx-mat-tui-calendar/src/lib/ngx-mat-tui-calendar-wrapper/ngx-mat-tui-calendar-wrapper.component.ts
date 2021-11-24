import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-mat-tui-calendar-wrapper',
  templateUrl: './ngx-mat-tui-calendar-wrapper.component.html',
  styleUrls: ['./ngx-mat-tui-calendar-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,  // this is needed so that our css rules override those in tui-calendar package
})
export class NgxMatTuiCalendarWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
