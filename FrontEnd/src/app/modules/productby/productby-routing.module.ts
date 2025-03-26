import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllproductbycategoryComponent } from './allproductbycategory/allproductbycategory.component';
import { ProductbyimdbComponent } from './productbyimdb/productbyimdb.component';
import { ProductbysectionComponent } from './productbysection/productbysection.component';
import { ProducytbynetworkComponent } from './producytbynetwork/producytbynetwork.component';
import { SearchComponent } from './search/search.component';
import { UpcomingmoviesComponent } from './upcomingmovies/upcomingmovies.component';

const routes: Routes = [
  {path: 'all/:nameSection', component: ProductbysectionComponent},
  {path: 'category/:section/:name/:category', component: AllproductbycategoryComponent},
  {path: 'upcomingmovies', component: UpcomingmoviesComponent},
  {path: 'searchbykeyword/:keyword', component: SearchComponent},
  {path: 'top-rated', component: ProductbyimdbComponent},
  {path: 'network/:networkId/:networkLabel', component: ProducytbynetworkComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductbyRoutingModule { }
