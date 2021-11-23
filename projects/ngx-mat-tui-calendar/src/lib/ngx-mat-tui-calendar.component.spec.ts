import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTuiCalendarComponent } from './ngx-mat-tui-calendar.component';

describe('MatTuiCalendarComponent', () => {
  let component: MatTuiCalendarComponent;
  let fixture: ComponentFixture<MatTuiCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTuiCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTuiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
