import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, repeat, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IArticle } from '../interfaces/i-article';
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
    errorObj: any;
    isDataError: boolean;
    isDestroyed$: Subject<boolean> = new Subject()
    isInProgress: boolean = true;
    placeholderImage: string = './assets/images/placeholder.jpg';
    search: string;
    searchPhrase$: FormControl = new FormControl();





    private initForms(){
        this.searchPhrase$.setValue("")
    }

    private fetchArticles(search?: string): void {
        // Dummy article for navigation purpose,
        // replace with newsService usage
        
        this.searchPhrase$.valueChanges.pipe(
            takeUntil(this.isDestroyed$),
            startWith(null),
            debounceTime(750),
            distinctUntilChanged(),
            tap(()=>(this.isInProgress = true)),
            switchMap((_searchPhrase:string)=>{
                if(_searchPhrase && _searchPhrase.length > 0) {
                    return this.newsService.getNews$(_searchPhrase);
                } else {
                    return this.newsService.getNews$('');
                }                
            }),
        )
        .subscribe(
             (articlesBySearch:any)=>{
                this.isInProgress = false;
                  console.log('articlesBySearch subs:', articlesBySearch);

                  if(articlesBySearch && articlesBySearch.articles) {
                  //
                  // response is ok, setting data, checking if urlToImage has value, if not replace to placeholder
                  //

                  this.isDataError = false;
                  this.errorObj = null;

                    this.articles = (articlesBySearch.articles as IArticle[]).map((art:IArticle)=><IArticle>{
                        author: art.author,
                        content: art.content,
                        description: art.description,
                        publishedAt: art.publishedAt,
                        source: art.source,
                        title: art.title,
                        url: art.url,
                        urlToImage: art.urlToImage ? art.urlToImage : this.placeholderImage
                      });                      
                  }
                  if(articlesBySearch && articlesBySearch.error) {
                      this.isDataError = true;
                      this.errorObj = articlesBySearch.error;
                  }




             },
             (error)=>{
                 this.isInProgress = false;
                 this.isDataError = true;
                 this.errorObj = error.error;
                },
             ()=>console.log('articlesBySearch completed..')
        );
    }

}
