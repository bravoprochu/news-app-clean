import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgnewsModule } from 'angular-news-api';
import { newsApiConfig } from './app.module';


import { NewsService, NEWS_DATA_TEMP } from './news.service';

describe('NewsService', () => {

  let service: NewsService;
  let httpMock: HttpTestingController;

  
  beforeEach(() =>{
    
  TestBed.configureTestingModule({
    imports: [
      NgnewsModule.forRoot(newsApiConfig),
      HttpClientTestingModule
    ],
    providers: []
  });

  service = TestBed.get(NewsService);
  httpMock = TestBed.get(HttpTestingController)
});


  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getNews using httpClient', ()=>{
    let ARTICLES = NEWS_DATA_TEMP;

  afterEach(() => {
    const req = httpMock.expectOne('https://newsapi.org/v2/top-headlines?language=en&apiKey=3febf3e1156a433086eb8f6c8bbc972a');
    expect(req.request.method).toEqual('GET');
    req.flush({articles: ARTICLES});
  });

    it('should get article array from service', ()=>{
      service.getNews$(null).subscribe((res)=> {
        expect(res.articles.length).toBe(2, 'total articles');
        expect(res.articles).toBe(ARTICLES, 'mocked articles data');
      }      
      );
    })
  })
});
