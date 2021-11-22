import { TestBed } from '@angular/core/testing';

import { MatNgxTuiCalendarService } from './mat-ngx-tui-calendar.service';

describe('MatNgxTuiCalendarService', () => {
  let service: MatNgxTuiCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatNgxTuiCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
