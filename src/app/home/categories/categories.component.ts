import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  mainCatAr:object[] = [];
  mainCatEng:object[] = [];
  mainCat:object[] = [];

  constructor(private lngSrv: LanguageService) { }

  ngOnInit() {
    this.mainCatEng = [
      {id: 1, title: 'Plumbing'},
      {id: 2, title: 'Electricty'}, 
      {id: 3, title: 'AC Maintaince'},
      {id: 4, title:'Carperentry'}
    ];
    this.mainCatAr = [
      {id: 1, title:'سباكة'},
      {id: 2, title:'كهرباء'},
      {id: 3, title:'تكييف'},
      {id: 4, title:'نجارة'}
    ];
    
    if (this.lngSrv.SelLang == 'ar') {
      this.mainCat = [...this.mainCatAr];
    } else {
      this.mainCat = [...this.mainCatEng];
    }


  }

}
