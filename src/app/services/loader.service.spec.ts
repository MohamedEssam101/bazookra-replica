import { TestBed } from '@angular/core/testing';

import { loaderService } from './loader.service';

describe('IsLoadingService', () => {
  let service: loaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(loaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
