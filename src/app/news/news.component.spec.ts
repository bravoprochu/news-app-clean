import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgnewsModule } from 'angular-news-api';
import { newsApiConfig } from '../app.module';
import { NewsService } from '../news.service';

import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatProgressBarModule,
        NgnewsModule.forRoot(newsApiConfig),
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [ NewsComponent ],
      providers: [
        NewsService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  // it('should getting data from news service API', fakeAsync(()=>{
  //   const newsService = fixture.debugElement.injector.get(NewsService);
  //   const data = spyOn(component, "ngOnInit").and.callFake(()=>{
  //     return of({articles: []}).pipe(delay(300))
  //   });

    
  //   newsService.getNews$(null).subscribe(res=>{
  //     expect(res.articles).toBe([])
  //   })

  //   expect(component.isInProgress).toEqual(true);
  //   tick(300);
  //   fixture.detectChanges();
  //   expect(component.isInProgress).toEqual(false);

  // }));

  // it('should show error on error data from news service API', fakeAsync(()=>{
  //   const newsService = fixture.debugElement.injector.get(NewsService);
  //   const data = spyOn(newsService, "getNews$").and.callFake(()=>{
  //     return of({status: 'error'}).pipe(delay(300))
  //   });
  //   fixture.detectChanges();
  //   expect(component.isDataError).toBe(true);
  //   tick(300)
  //   expect(component.isDataError).not.toBe(true);
  // }));

});
