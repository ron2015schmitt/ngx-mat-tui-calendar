import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatTuiCalendarWrapperComponent } from './ngx-mat-tui-calendar-wrapper.component';

describe('NgxMatTuiCalendarWrapperComponent', () => {
  let component: NgxMatTuiCalendarWrapperComponent;
  let fixture: ComponentFixture<NgxMatTuiCalendarWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatTuiCalendarWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatTuiCalendarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
