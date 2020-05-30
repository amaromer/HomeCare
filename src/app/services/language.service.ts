import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { OrintationService } from './orintation.service';


export const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public SelLang = 'ar';

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private orientation: OrintationService
    ) { }

    async SetInitialAppLanguage() {    
      this.translate.setDefaultLang('ar');
      this.orientation.setReadingDirection('rtl');     
      
     await this.storage.get(LNG_KEY).then(val => {
        if (val) {
          this.setLanguage(val);
          this.SelLang = val;                          
        }
      });      
    }
    
    getLanguage() {
      return [
        { text: 'Englist', value: 'en', img: 'assets/flags/en.png'},
        { text: 'العربية', value: 'ar', img:'assets/flags/ar.png'},
      ];
    }

    setLanguage(lng: string) {
      this.translate.use(lng);
     
      this.storage.set(LNG_KEY, lng);

      this.SelLang = lng;

      if (lng == 'ar') {
        this.orientation.setReadingDirection('rtl');
      } else {
        this.orientation.setReadingDirection('ltr');
      }      
      
    }

   
}
