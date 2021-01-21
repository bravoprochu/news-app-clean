import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatProgressBarModule, MatCardModule, MatDividerModule, MatListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { NewsApiKeyConfig, NgnewsModule } from 'angular-news-api';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

const newsApiKey = '3febf3e1156a433086eb8f6c8bbc972a';

const newsApiConfig: NewsApiKeyConfig = {
    key: newsApiKey
  };

@NgModule({
    declarations: [
        AppComponent,
        NewsDetailComponent,
        NewsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatToolbarModule,
        NgnewsModule.forRoot(newsApiConfig),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
