import { TestBed } from '@angular/core/testing';

import { ServicosPet } from './servicos-pet';

describe('ServicosPet', () => {
  let service: ServicosPet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosPet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
