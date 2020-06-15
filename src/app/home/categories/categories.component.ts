import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/cat.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  
  mainCat: Category[] = [];
  ar: boolean;
  
  constructor(private lngSrv: LanguageService, private catSrv: CategoriesService) { }

  ngOnInit() {
    if (this.lngSrv.SelLang == 'ar') {
      this.ar = true;
    }
    this.mainCat = [... this.catSrv.getCats()];
  }

}
