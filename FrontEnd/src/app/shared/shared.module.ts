import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './components/actions/actions.component';
import { CardmovieComponent } from './components/cardmovie/cardmovie.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { ModalfavoritComponent } from './components/modalfavorit/modalfavorit.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule, MDBBootstrapModule, MDBModalRef, ModalModule, NavbarModule } from 'angular-bootstrap-md';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material.module';
import { NavBarComponent } from './layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SafeurlserviceService } from '../core/services/safeurlservice.service';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [ActionsComponent, CardmovieComponent, DetailModalComponent,
    ModalfavoritComponent, PageNotFoundComponent,
    FooterComponent, NavBarComponent, SafeurlserviceService,SettingsComponent,
    LoginComponent,
    ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot(),
    LazyLoadImageModule,
    NgxSpinnerModule,
    NgZorroAntdModule,
    TranslateModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ActionsComponent,
    CardmovieComponent,
    PageNotFoundComponent,
    ModalfavoritComponent,
    NavBarComponent,
    MDBBootstrapModule,
    FooterComponent,
    SettingsComponent,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
    ToastrModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    NgZorroAntdModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    SafeurlserviceService,
  ],
  entryComponents:[DetailModalComponent, LoginComponent, ContactComponent],
  providers: []

})
export class SharedModule { }
