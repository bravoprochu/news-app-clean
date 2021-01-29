import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    switchMap,
    takeUntil,
    tap,
} from "rxjs/operators";
import { IArticle } from "../interfaces/i-article";
import { NewsService } from "../news.service";

@Component({
    selector: "app-news",
    templateUrl: "./news.component.html",
    styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit, OnDestroy {
    constructor(private newsService: NewsService) {}

    articles: any[] = [];
    errorObj: any;
    isDataError: boolean;
    isDestroyed$: Subject<boolean> = new Subject();
    isInProgress = true;
    placeholderImage = "./assets/images/placeholder.jpg";
    search: string;
    searchPhrase$: FormControl = new FormControl();

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
        this.isDestroyed$.unsubscribe();
    }

    public ngOnInit() {
        this.initForms();
        this.fetchArticles();
    }

    private initForms() {
        this.searchPhrase$.setValue("");
    }
    private fetchArticles(search?: string): void {
        // Dummy article for navigation purpose,
        // replace with newsService usage

        this.searchPhrase$.valueChanges
            .pipe(
                takeUntil(this.isDestroyed$),
                startWith(null),
                debounceTime(750),
                distinctUntilChanged(),
                tap(() => (this.isInProgress = true)),
                switchMap((searchPhrase: string) => {
                    if (searchPhrase && searchPhrase.length > 0) {
                        return this.newsService.getNews$(searchPhrase);
                    } else {
                        return this.newsService.getNews$("");
                    }
                })
            )
            .subscribe(
                (articlesBySearch: any) => {
                    this.isInProgress = false;

                    if (articlesBySearch && articlesBySearch.articles) {
                        //
                        // response is ok, setting data, checking if urlToImage has value, if not replace to placeholder
                        //

                        this.isDataError = false;
                        this.errorObj = null;

                        this.articles = articlesBySearch.articles as IArticle[];
                        this.articles.forEach((art: IArticle) => {
                            art.urlToImage = art.urlToImage
                                ? art.urlToImage
                                : this.placeholderImage;
                        });
                    }
                    if (articlesBySearch && articlesBySearch.error) {
                        this.isDataError = true;
                        this.errorObj = articlesBySearch.error;
                    }
                },
                (error) => {
                    this.isInProgress = false;
                    this.isDataError = true;
                    this.errorObj = error.error;
                }
            );
    }
}
