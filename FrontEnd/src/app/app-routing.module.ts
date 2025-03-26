import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminGuard} from './core/guards/admin.guard';
import {UserGuard} from './core/guards/user.guard';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {SettingsComponent} from './shared/components/settings/settings.component';

const appRoutes: Routes = [
  {
    path: 'detail',
    loadChildren: () => import('./modules/detail/detail.module').then(m => m.DetailModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'query',
    loadChildren: () => import('./modules/productby/productby.module').then(m => m.ProductbyModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [UserGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
