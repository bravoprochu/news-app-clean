import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {IArticle}  from '../interfaces/i-article'
import { IComment } from '../interfaces/i-comment';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
    constructor(
        public activatedRoute: ActivatedRoute
    ) { }


    public ngOnInit() {
        this.initActivatedRoutes();
    }


    public article$: Observable<object>;
    article: IArticle;



    initActivatedRoutes(){
                this.activatedRoute.paramMap.pipe(
            map(() => window.history.state)
        )
        .subscribe(
             (_state:any)=>{
                  console.log('_state subs:', _state);
                  this.article = _state;
                  
             },
             (error)=>console.log('_state error', error),
             ()=>console.log('_state completed..')
        );

        // Make sure that this page can only be
        // accessible from the main News list with
        // a loaded article from 'state', if url entered
        // manually from the browser it should go back to
        // the /news view

        //
        // Used canActivateDetailGuard (path guard)
        //
    }


    public goToArticle(url: string): void {
        // Open original article in new tab
    }


    //#region extra data
    public comments: IComment[] = [
        {
            name: 'Chris Nat',
            date: new Date(),
            avatar: '/assets/images/1.jpg',
            comment: `Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
        {
            name: 'Matt Damon',
            date: new Date(),
            avatar: '/assets/images/2.jpg',
            comment: `Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. `,
        },
        {
            name: 'Seb Willhelm',
            date: new Date(),
            avatar: '/assets/images/3.jpg',
            comment: `Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.`,
        },
    ];
    //#endregion
}
