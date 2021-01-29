import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CanActivateDetailGuard } from "./guards/can-activate-detail.guard";

import { NewsDetailComponent } from "./news-detail/news-detail.component";
import { NewsComponent } from "./news/news.component";

export const routes: Routes = [
    { path: "", redirectTo: "/news", pathMatch: "full" },
    {
        path: "news",
        component: NewsComponent,
        data: { animation: "NewsComponent" },
    },
    {
        path: "article",
        component: NewsDetailComponent,
        data: { animation: "NewsDetailComponent" },
        canActivate: [CanActivateDetailGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
