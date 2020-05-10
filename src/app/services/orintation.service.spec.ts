import { TestBed } from '@angular/core/testing';

import { OrintationService } from './orintation.service';

describe('OrintationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrintationService = TestBed.get(OrintationService);
    expect(service).toBeTruthy();
  });
});
