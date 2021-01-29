import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { NgnewsModule } from "angular-news-api";
import { of } from "rxjs";
import { newsApiConfig } from "../app.module";
import { NewsService, NEWS_DATA_TEMP } from "../news.service";

import { NewsComponent } from "./news.component";

describe("NewsComponent", () => {
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
                RouterModule.forRoot([]),
            ],
            declarations: [NewsComponent],
            providers: [
                {
                    provide: NewsService,
                    useValue: {
                        getNews$: () => {
                            return of({
                                articles: NEWS_DATA_TEMP,
                            });
                        },
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsComponent);
        component = fixture.componentInstance;
        component.articles = NEWS_DATA_TEMP;
        fixture.detectChanges();
    });

    it("should have articles array length", () => {
        expect(component.articles.length).toEqual(2, "articles array length");
    });

    it("should have sections with .news-mini-card class", () => {
        const el = fixture.nativeElement as HTMLElement;
        expect(el.querySelectorAll(".news-mini-card").length).toEqual(
            2,
            "sections with class news-mini-card"
        );
    });

    it("should 1st news info title to be AUTOR 1", () => {
        const el = fixture.nativeElement as HTMLElement;
        expect(
            el.querySelector(".news-mini-info .mat-title").textContent
        ).toContain("AUTOR 1", "first news section info title");
    });
});
