import { BrowserModule,HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafeurlserviceService} from 'src/app/service/safeurlservice.service';
import { MaterialModule } from './material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';
import { ProductbysectionComponent } from './components/productbysection/productbysection.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AllproductbycategoryComponent } from './components/allproductbycategory/allproductbycategory.component';
import { ProductbyimdbComponent } from './components/productbyimdb/productbyimdb.component';
import { UpcomingmoviesComponent } from './components/upcomingmovies/upcomingmovies.component';
import { SearchComponent } from './components/search/search.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { CardmovieComponent } from './components/cardmovie/cardmovie.component';
import { ModalfavoritComponent } from './components/modalfavorit/modalfavorit.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { ToastrModule } from 'ngx-toastr';
import { ShareModule } from '@ngx-share/core';
import { ActorsKnownForComponent } from './components/actors-known-for/actors-known-for.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActionsComponent } from './components/actions/actions.component';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LikeDislikeComponent } from './components/like-dislike/like-dislike.component';
import { NgZorroAntdModule, NZ_I18N, en_US  } from 'ng-zorro-antd';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommentsComponent } from './components/comments/comments.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AuthInterceptor } from './service/authinterceptor.service';

registerLocaleData(en);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pinch': { enable: false},
    'rotate': { enable: false}
  }
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ProductbysectionComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    SafeurlserviceService,
    AllproductbycategoryComponent,
    ProductbyimdbComponent,
    UpcomingmoviesComponent,
    SearchComponent,
    WatchlistComponent,
    HighlightsComponent,
    CardmovieComponent,
    ModalfavoritComponent,
    LoginComponent,
    ActorsKnownForComponent,
    ShowDetailsComponent,
    SettingsComponent,
    ActionsComponent,
    PageNotFoundComponent,
    DetailModalComponent,
    ProfileComponent,
    LikeDislikeComponent,
    CommentsComponent,
    TimeAgoPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ShareModule,
    LazyLoadImageModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxSpinnerModule,
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),

  ],
  providers: [{provide:HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    TimeAgoPipe,
    { provide: NZ_I18N, useValue: en_US },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
    
  ],
  bootstrap: [AppComponent],
  entryComponents:[DetailModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
