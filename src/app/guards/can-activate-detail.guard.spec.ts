import { TestBed, async, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatFormFieldModule, MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { NewsComponent } from '../news/news.component';

import { CanActivateDetailGuard } from './can-activate-detail.guard';

describe('CanActivateDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        AppRoutingModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatProgressBarModule,
        ReactiveFormsModule
      ],
      declarations: [
        NewsComponent,
        NewsDetailComponent
      ],
      providers: [CanActivateDetailGuard]
    });
  });

  it('should ...', inject([CanActivateDetailGuard], (guard: CanActivateDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
