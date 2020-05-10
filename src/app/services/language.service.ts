import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { OrintationService } from './orintation.service';
import { Subject } from 'rxjs';


export const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';
  langChanged = new Subject<string>();

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private orientation: OrintationService
    ) { }

    SetInitialAppLanguage() {    
      this.translate.setDefaultLang('ar');
      this.orientation.setReadingDirection('rtl');   
      
      this.storage.get(LNG_KEY).then(val => {
        if (val) {
          this.setLanguage(val);
          this.selected = val;                  
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
      this.selected = lng;
      this.storage.set(LNG_KEY, lng);
      if (lng == 'ar') {
        this.orientation.setReadingDirection('rtl');
      } else {
        this.orientation.setReadingDirection('ltr');
      }
      // this.langChanged.next(lng);
      //location.reload();
    }

   
}
