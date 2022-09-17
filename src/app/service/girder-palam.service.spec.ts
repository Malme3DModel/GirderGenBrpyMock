import { TestBed } from '@angular/core/testing';

import { GirderPalamService } from './girder-palam.service';

describe('GirderPalamService', () => {
  let service: GirderPalamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GirderPalamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
