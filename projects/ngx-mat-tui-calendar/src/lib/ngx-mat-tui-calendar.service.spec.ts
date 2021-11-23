import { TestBed } from '@angular/core/testing';

import { NgxMatTuiCalendarService } from './ngx-mat-tui-calendar.service';

describe('NgxMatTuiCalendarService', () => {
  let service: NgxMatTuiCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatTuiCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
