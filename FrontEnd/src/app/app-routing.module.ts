import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './core/guards/user.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
const appRoutes: Routes = [
  {path: 'detail',
  loadChildren:'./modules/detail/detail.module#DetailModule'
  },
  {path: 'home',
  loadChildren: './modules/home/home.module#HomeModule'
  },
  {path: '',
  loadChildren: './modules/home/home.module#HomeModule'
  },
  {path: 'query',
  loadChildren: './modules/productby/productby.module#ProductbyModule'
  },
  {path: 'user',
  loadChildren: './modules/user/user.module#UserModule', canActivate: [UserGuard]
  },
  {path: 'not-found', component: PageNotFoundComponent},
 {path: 'settings',component: SettingsComponent},

  // {path: 'all/:nameSection', component: ProductbysectionComponent},
  // {path: 'category/:section/:name/:category', component: AllproductbycategoryComponent},
  // {path: 'home', component: ProductsListComponent},
  // {path: 'upcomingmovies', component: UpcomingmoviesComponent},
  // {path: 'searchbykeyword/:keyword', component: SearchComponent},
  // {path: 'watchlist', component: WatchlistComponent, canActivate: [UserGuard]},
  // {path: 'actorworks/:id', component: ActorsKnownForComponent},
  // {path: '', component: ProductsListComponent},
  // {path: 'settings',component: SettingsComponent},
  // {path:'top-rated', component: ProductbyimdbComponent},
  // {path: 'not-found', component: PageNotFoundComponent},
  // {path: 'profile',component: ProfileComponent, canActivate: [UserGuard]},
  // {path: '**', redirectTo: 'home' },
  // {path:'',redirectTo: 'home', pathMatch: 'full'},
  


  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
