import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '../../shared/components/settings/settings.component';
import { ActorsKnownForComponent } from './actors-known-for/actors-known-for.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: 'section/:section/:idProduct', component:ProductDetailsComponent},
  {path: 'actorworks/:id', component: ActorsKnownForComponent},
  // {path: 'settings',component: SettingsComponent},
  {path: 'episode/:name/:id/:ep/:s',component: EpisodesComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
