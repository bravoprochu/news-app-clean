import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateDetailGuard } from './can-activate-detail.guard';

describe('CanActivateDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateDetailGuard]
    });
  });

  it('should ...', inject([CanActivateDetailGuard], (guard: CanActivateDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
