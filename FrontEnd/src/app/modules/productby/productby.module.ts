import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductbyRoutingModule } from './productby-routing.module';
import { AllproductbycategoryComponent } from './allproductbycategory/allproductbycategory.component';
import { ProductbyimdbComponent } from './productbyimdb/productbyimdb.component';
import { ProductbysectionComponent } from './productbysection/productbysection.component';
import { SearchComponent } from './search/search.component';
import { UpcomingmoviesComponent } from './upcomingmovies/upcomingmovies.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProducytbynetworkComponent } from './producytbynetwork/producytbynetwork.component';

@NgModule({
  declarations: [AllproductbycategoryComponent, ProductbyimdbComponent, ProductbysectionComponent, SearchComponent, UpcomingmoviesComponent, ProducytbynetworkComponent],
  imports: [
    CommonModule,
    ProductbyRoutingModule,
    SharedModule
  ]
})
export class ProductbyModule { }
