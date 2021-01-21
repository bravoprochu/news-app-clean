import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, repeat, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NewsService } from '../news.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
        this.isDestroyed$.unsubscribe();
    }



    constructor(
        private newsService: NewsService
    ) {

    }

    public ngOnInit() {
        this.initForms();
        this.fetchArticles();
    }


    articles: any[] = [];
    isDestroyed$: Subject<boolean> = new Subject()
    isInProgress: boolean;
    search: string;
    searchPhrase$: FormControl = new FormControl();
    searchPhraseInitValue: string = "trump";




    private initForms(){
        this.searchPhrase$.setValue("")
    }

    private fetchArticles(search?: string): void {
        // Dummy article for navigation purpose,
        // replace with newsService usage


        this.searchPhrase$.valueChanges.pipe(
            takeUntil(this.isDestroyed$),
            startWith("."),
            debounceTime(750),
            distinctUntilChanged(),
            tap(()=>(this.isInProgress = true)),
            switchMap((_searchPhrase:string)=>{
                if(_searchPhrase && _searchPhrase.length > 0) {
                    console.log('isSearch')
                    return this.newsService.getNews$(_searchPhrase).pipe(
                        
                    );
                } else {
                    return of();
                }

                
            }),
        )
        .subscribe(
             (articlesBySearch:any)=>{
                this.isInProgress = false;
                  console.log('articlesBySearch subs:', articlesBySearch);
                  this.articles = articlesBySearch.articles;
                  
             },
             (error)=>{
                 // console.log('articlesBySearch error', error);
                 this.isInProgress = false;

                },
             ()=>console.log('articlesBySearch completed..')
        );


        // this.newsService.getNews$('')
        // .subscribe(
        //      (_news:any)=>{
        //           console.log('_news subs:', _news);
                  
        //      },
        //      (error)=>console.log('_news error', error),
        //      ()=>console.log('_news completed..')
        // );

    }





}
