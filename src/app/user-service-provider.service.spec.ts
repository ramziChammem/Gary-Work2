import { TestBed } from '@angular/core/testing';

import { UserServiceProviderService } from './user-service-provider.service';

describe('UserServiceProviderService', () => {
  let service: UserServiceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
