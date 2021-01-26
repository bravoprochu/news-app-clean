import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsApiService, TopHeadlinesConfig } from 'angular-news-api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IArticle } from './interfaces/i-article';



export const NEWS_DATA_TEMP: IArticle[] = [
    {
        author: 'Autor 1',
        content: 'ciakwet jaki to kontent',
        description: 'description mfs',
        publishedAt: '2001-01-01T01:01:00Z',
        source: {
            id: 'autor1_id',
            name: 'jakies tam name autor 1'
        },
        title: 'autor 1 Title',
        url: 'https://onet.pl',
        urlToImage: null
    },
    {
        author: 'Autor 2',
        content: 'ciakwet jaki to kontent 2',
        description: 'description mfs 2',
        publishedAt: '2001-01-05T01:01:00Z',
        source: {
            id: 'autor2_id',
            name: 'jakies tam name autor 2'
        },
        title: 'autor 2 Title',
        url: 'https://google.com',
        urlToImage: null
    }
             
]


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
        // so im using httpClientModule
        // 
        // 


        //
        // got banned by newsAPI servis (free version allows only 100 req per 24h)
        // mocked news_data data 
        // 
        // return of({costam: null, articles: NEWS_DATA_TEMP});

        //
        // if no request limit, hit the servis api
        //
        const query = searchPhrase && searchPhrase.length > 0 ? `&q=${searchPhrase}` : '';
        const params =  encodeURI(`language=en${query}&apiKey=${environment.newsApiKey}`);
        const newsAPIUrl = `${environment.newsAPIUrlTopHeadlins}${params}`

        console.log('url', params, newsAPIUrl);

        return this.httpClient.get(newsAPIUrl).pipe(
            catchError(err=>{
                return of(err);
            })
        )

     }
     
}
