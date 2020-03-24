import { TestBed } from '@angular/core/testing';

import { FrenchCommonService } from './french-common.service';

describe('FrenchCommonService', () => {
  let service: FrenchCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrenchCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
