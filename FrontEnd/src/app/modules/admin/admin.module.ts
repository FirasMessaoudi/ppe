import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [ListUsersComponent, RequestsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
