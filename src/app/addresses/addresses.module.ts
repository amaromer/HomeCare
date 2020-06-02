import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressesPageRoutingModule } from './addresses-routing.module';

import { AddressesPage } from './addresses.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressesPageRoutingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [AddressesPage]
})
export class AddressesPageModule {}
