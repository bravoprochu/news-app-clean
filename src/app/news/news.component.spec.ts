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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
