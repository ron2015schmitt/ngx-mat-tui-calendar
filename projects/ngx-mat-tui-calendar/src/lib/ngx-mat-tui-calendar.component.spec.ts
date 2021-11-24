import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatTuiCalendarComponent } from './ngx-mat-tui-calendar.component';

describe('NgxMatTuiCalendarComponent', () => {
  let component: NgxMatTuiCalendarComponent;
  let fixture: ComponentFixture<NgxMatTuiCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatTuiCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatTuiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
