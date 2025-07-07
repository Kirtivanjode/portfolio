import { TestBed } from '@angular/core/testing';

import { WindowManagerService } from '../services/window-manager.service';

describe('WindowManagerService', () => {
  let service: WindowManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
