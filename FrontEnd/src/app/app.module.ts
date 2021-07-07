import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShareModule } from '@ngx-share/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NZ_I18N, en_US  } from 'ng-zorro-antd';
import {TimeAgoPipe} from 'time-ago-pipe';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AuthInterceptor } from './core/interceptors/authinterceptor.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { HighlightsComponent } from './modules/home/highlights/highlights.component';

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
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    ShareModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
