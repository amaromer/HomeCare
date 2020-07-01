import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPage } from './checkout.page';


const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  },
  {
    path: 'order-complete',
    loadChildren: () => import('./order-complete/order-complete.module').then( m => m.OrderCompletePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
