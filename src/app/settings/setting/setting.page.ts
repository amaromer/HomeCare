import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LNG_KEY } from 'src/app/services/language.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  selectedLang = '';

  constructor(private lngService: LanguageService, private storage: Storage) { }

  ngOnInit() {
    this.selectedLang = 'ar';
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.lngService.setLanguage(val);
        this.selectedLang = val;                  
      }
    });
  }

  setLang(lng) {
    this.lngService.setLanguage(lng);  
    this.selectedLang = this.lngService.selected;  
    location.reload();   
  }

}
