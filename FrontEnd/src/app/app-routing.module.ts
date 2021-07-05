import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductbysectionComponent } from './components/productbysection/productbysection.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AllproductbycategoryComponent } from './components/allproductbycategory/allproductbycategory.component';
import { ProductbyimdbComponent } from './components/productbyimdb/productbyimdb.component';
import { UpcomingmoviesComponent } from './components/upcomingmovies/upcomingmovies.component';
import { SearchComponent } from './components/search/search.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { ActorsKnownForComponent } from './components/actors-known-for/actors-known-for.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserGuard } from './guards/user.guard';
const appRoutes: Routes = [
  {path: 'detail/:section/:idProduct', component: ProductDetailsComponent},
  {path: 'all/:nameSection', component: ProductbysectionComponent},
  {path: 'category/:section/:name/:category', component: AllproductbycategoryComponent},
  {path: 'home', component: ProductsListComponent},
  {path: 'upcomingmovies', component: UpcomingmoviesComponent},
  {path: 'searchbykeyword/:keyword', component: SearchComponent},
  {path: 'watchlist', component: WatchlistComponent, canActivate: [UserGuard]},
  {path: 'actorworks/:id', component: ActorsKnownForComponent},
  {path: '', component: ProductsListComponent},
  {path: 'settings',component: SettingsComponent},
  {path:'top-rated', component: ProductbyimdbComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'profile',component: ProfileComponent, canActivate: [UserGuard]},
  {path: '**', redirectTo: 'home' },
  {path:'',redirectTo: 'home', pathMatch: 'full'},
  


  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
