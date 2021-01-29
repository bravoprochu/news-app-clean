import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NewsDetailComponent } from "./news-detail/news-detail.component";
import { NewsComponent } from "./news/news.component";
import { NewsApiKeyConfig, NgnewsModule } from "angular-news-api";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from "@angular/cdk/layout";
import { environment } from "src/environments/environment";

const newsApiKey = "REMOVED_TO_ENVIRONMENT....";

export const newsApiConfig: NewsApiKeyConfig = {
    key: environment.newsApiKey,
};

@NgModule({
    declarations: [AppComponent, NewsDetailComponent, NewsComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        FlexLayoutModule,
        LayoutModule,
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
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
