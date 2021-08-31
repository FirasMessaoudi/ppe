import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserStatComponent } from './user-stat/user-stat.component';

@NgModule({
  declarations: [ProfileComponent, WatchlistComponent, UserStatComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
