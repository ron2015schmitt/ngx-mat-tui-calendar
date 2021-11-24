import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatTuiCalendarEditorDialogComponent } from './ngx-mat-tui-calendar-editor-dialog.component';

describe('NgxMatTuiCalendarEditorDialogComponent', () => {
  let component: NgxMatTuiCalendarEditorDialogComponent;
  let fixture: ComponentFixture<NgxMatTuiCalendarEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatTuiCalendarEditorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatTuiCalendarEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
