import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule   
  ],
  declarations: [HeaderComponent, LocationPickerComponent, ImagePickerComponent, MapModalComponent],
  exports: [
    HeaderComponent,
    LocationPickerComponent,
    ImagePickerComponent,
    MapModalComponent
  ],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
