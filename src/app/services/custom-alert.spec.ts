import { TestBed } from '@angular/core/testing';

import { CustomAlert } from './custom-alert';

describe('CustomAlert', () => {
  let service: CustomAlert;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAlert);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
