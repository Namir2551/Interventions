import { TestBed } from '@angular/core/testing';

import { TypeproblemService } from './typeproblem.service';

describe('TypeproblemService', () => {
  let service: TypeproblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeproblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
