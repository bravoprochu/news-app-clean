import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from "@angular/cdk/layout";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { IArticle } from "../interfaces/i-article";
import { IComment } from "../interfaces/i-comment";

@Component({
    selector: "app-news-detail",
    templateUrl: "./news-detail.component.html",
    styleUrls: ["./news-detail.component.scss"],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
    constructor(
        public activatedRoute: ActivatedRoute,
        private breakPointObs: BreakpointObserver
    ) {}

    public article$: Observable<object>;
    article: IArticle;
    isDestroyed$: Subject<boolean> = new Subject();
    isSmall: boolean;

    //#region extra data
    public comments: IComment[] = [
        {
            name: "Chris Nat",
            date: new Date(),
            avatar: "/assets/images/1.jpg",
            comment: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
        {
            name: "Matt Damon",
            date: new Date(),
            avatar: "/assets/images/2.jpg",
            comment: `Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. `,
        },
        {
            name: "Seb Willhelm",
            date: new Date(),
            avatar: "/assets/images/3.jpg",
            comment: `Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.`,
        },
    ];

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
        this.isDestroyed$.unsubscribe();
    }

    public ngOnInit() {
        this.initBreakPointObserver();
        this.initActivatedRoutes();
    }

    initActivatedRoutes() {
        this.activatedRoute.paramMap
            .pipe(map(() => window.history.state))
            .subscribe((state: any) => {
                this.article = state as IArticle;
            });

        // Make sure that this page can only be
        // accessible from the main News list with
        // a loaded article from 'state', if url entered
        // manually from the browser it should go back to
        // the /news view

        //
        // Used canActivateDetailGuard (path guard)
        //
    }

    initBreakPointObserver() {
        this.breakPointObs
            .observe([Breakpoints.Small, Breakpoints.XSmall])
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe((breakPointObs: BreakpointState) => {
                this.isSmall = breakPointObs.matches;
            });
    }

    public goToArticle(url: string): void {
        window.open(this.article.url, "_blank");
    }
    //#endregion
}
