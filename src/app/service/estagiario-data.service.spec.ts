import { TestBed } from '@angular/core/testing';

import { EstagiarioDataService } from './estagiario-data.service';

describe('EstagiarioDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstagiarioDataService = TestBed.get(EstagiarioDataService);
    expect(service).toBeTruthy();
  });
});
