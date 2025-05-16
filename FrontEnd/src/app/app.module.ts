import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TimeAgoPipe} from 'time-ago-pipe';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import fr from '@angular/common/locales/fr';
import ar from '@angular/common/locales/ar';


import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AuthInterceptor } from './core/interceptors/authinterceptor.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {MaterialModule} from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(en);
registerLocaleData(fr);
registerLocaleData(ar);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pinch': { enable: false},
    'rotate': { enable: false}
  };
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
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    NgbModule,

  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    // TimeAgoPipe,
    { provide: NZ_I18N, useValue: en_US },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
