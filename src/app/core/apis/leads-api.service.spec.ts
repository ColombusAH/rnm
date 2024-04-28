import { TestBed } from '@angular/core/testing';

import { LeadsApiService } from './leads-api.service';

describe('LeadsApiService', () => {
  let service: LeadsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
