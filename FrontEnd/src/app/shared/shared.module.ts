import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionsComponent} from './components/actions/actions.component';
import {CardmovieComponent} from './components/cardmovie/cardmovie.component';
import {DetailModalComponent} from './components/detail-modal/detail-modal.component';
import {ModalfavoritComponent} from './components/modalfavorit/modalfavorit.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {FooterComponent} from './layout/footer/footer.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {MaterialModule} from '../material.module';
import {NavBarComponent} from './layout/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {SafeurlserviceService} from '../core/services/safeurlservice.service';
import {LoginComponent} from './components/login/login.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ContactComponent} from './components/contact/contact.component';
import {LocalizedDatePipe} from './pipes/localized-date.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {NzCarouselModule} from 'ng-zorro-antd/carousel';
import {NzPopoverModule} from 'ng-zorro-antd/popover';  // Ensure you import this

@NgModule({
  declarations: [
    ActionsComponent,
    CardmovieComponent,
    DetailModalComponent,
    ModalfavoritComponent,
    PageNotFoundComponent,
    FooterComponent,
    NavBarComponent,
    SafeurlserviceService,
    SettingsComponent,
    LoginComponent,
    ContactComponent,
    LocalizedDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    LazyLoadImageModule,
    NgxSpinnerModule,
    NzCarouselModule,
    TranslateModule,
    RouterModule,
    NgxPaginationModule,
    NzPopoverModule

  ],
  exports: [
    CommonModule,
    ActionsComponent,
    CardmovieComponent,
    PageNotFoundComponent,
    ModalfavoritComponent,
    NavBarComponent,
    FooterComponent,
    SettingsComponent,
    LocalizedDatePipe,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    SafeurlserviceService,
    NgxPaginationModule,
    NzCarouselModule,
    NzPopoverModule
  ],
  providers: []

})
export class SharedModule {
}
