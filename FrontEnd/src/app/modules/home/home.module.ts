import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HighlightsComponent } from './highlights/highlights.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HighlightsComponent, ProductsListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,

  ]
})
export class HomeModule { }
