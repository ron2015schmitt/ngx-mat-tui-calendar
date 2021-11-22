import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatNgxTuiCalendarComponent } from './mat-ngx-tui-calendar.component';

describe('MatNgxTuiCalendarComponent', () => {
  let component: MatNgxTuiCalendarComponent;
  let fixture: ComponentFixture<MatNgxTuiCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatNgxTuiCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatNgxTuiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
