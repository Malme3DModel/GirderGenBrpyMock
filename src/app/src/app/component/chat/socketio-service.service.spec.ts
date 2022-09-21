import { TestBed } from '@angular/core/testing';

import { SocketioServiceService } from '../../../../component/chat/socketio-service.service';

describe('SocketioServiceService', () => {
  let service: SocketioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
