import { TestBed } from '@angular/core/testing';

import { PacienteDataService } from './paciente-data.service';

describe('PacienteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacienteDataService = TestBed.get(PacienteDataService);
    expect(service).toBeTruthy();
  });
});
