import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [SettingPage]
})
export class SettingPageModule {}
