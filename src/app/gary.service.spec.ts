import { TestBed } from '@angular/core/testing';

import { GaryService } from './gary.service';

describe('GaryService', () => {
  let service: GaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
