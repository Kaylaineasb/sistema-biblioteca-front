import { TestBed } from '@angular/core/testing';

import { Emprestimo } from './emprestimo';

describe('Emprestimo', () => {
  let service: Emprestimo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emprestimo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
