import { TestBed } from '@angular/core/testing';

import { CheckLoginGuard } from './check-login.guard';

describe('CheckLoginGuard', () => {
  let guard: CheckLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
