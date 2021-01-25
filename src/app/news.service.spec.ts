import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgnewsModule } from 'angular-news-api';
import { newsApiConfig } from './app.module';

import { NewsService } from './news.service';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NgnewsModule.forRoot(newsApiConfig),
      HttpClientModule
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
  });
});
