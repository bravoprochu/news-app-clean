import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsApiService, TopHeadlinesConfig } from 'angular-news-api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { NewsApiService } from 'angular-news-api';
// import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class NewsService {

    constructor(
        private newsApiService: NewsApiService,
        private httpClient: HttpClient
    ) {}

    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */


     getNews$(searchPhrase: string){
        // const TOP_HEADLINES_CONFIG: TopHeadlinesConfig = {
        //     language: 'en',
        //     q: searchPhrase
        // }

        // return this.newsApiService.topHeadlines(TOP_HEADLINES_CONFIG).pipe(
        //     catchError(err=>{
        //         return of('error during getting data..')
        //     })
        // )





        //
        // cant get data using newsAPIService (CORS policy error)
        // found CORS PROXY solution
        // 
        // 

        const params =  `language=en&q=${searchPhrase}&apiKey=${environment.newsApiKey}`;
        const newsAPIUrl = `${environment.newsAPIUrlTopHeadlins}${params}`

        return this.httpClient.get(newsAPIUrl).pipe(
            catchError(err=>{
                return of('error during getting data..')
            })
        )

     }
}
