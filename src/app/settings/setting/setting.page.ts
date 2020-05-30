import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
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
    this.selectedLang = this.lngService.SelLang;    
  }

  setLang(lng) {
    this.lngService.setLanguage(lng);
  }

}
