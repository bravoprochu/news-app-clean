import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule, MatDividerModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { NewsDetailComponent } from "./news-detail.component";

describe("NewsDetailComponent", () => {
    let component: NewsDetailComponent;
    let fixture: ComponentFixture<NewsDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatDividerModule,
                RouterModule.forRoot([]),
            ],
            declarations: [NewsDetailComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
