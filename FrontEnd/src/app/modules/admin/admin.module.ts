import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminStatComponent } from './admin-stat/admin-stat.component';

@NgModule({
  declarations: [ListUsersComponent, RequestsComponent, AdminComponent, AdminStatComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
