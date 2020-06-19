import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesPage } from './addresses.page';

const routes: Routes = [
  {
    path: '',
    component: AddressesPage
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'edit-address/:place_id',
    loadChildren: () => import('./edit-address/edit-address.module').then( m => m.EditAddressPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressesPageRoutingModule {}
