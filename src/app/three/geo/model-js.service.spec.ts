import { TestBed } from '@angular/core/testing';

import { ModelJsService } from './model-js.service';

describe('ModelJsService', () => {
  let service: ModelJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
