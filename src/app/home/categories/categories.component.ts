import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/cat.model';
import { service } from 'src/app/service.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  
  mainCat: Category[] = [];
  ar: boolean;
  isLoading: boolean = false;

  constructor(private lngSrv: LanguageService, private catSrv: CategoriesService) { }

  ngOnInit() {
    if (this.lngSrv.SelLang == 'ar') {
      this.ar = true;
    }

    this.isLoading = true;
    this.catSrv.getCats().subscribe (
      data => {
        console.log(data);
          data.categories.forEach(item => {
            this.mainCat.push({
              id: +item.id, 
              title: item.title,
              artitle: item.ar_title, 
              imageUrl: item.icon, 
              description:"", 
              service: [...item.cat_services.map
                (item => { 
                  let service: service = {
                      id: +item.id,
                      title: item.title,
                      artitle: item.ar_title,
                      description: "",
                      price: +item.rate
                    }
                  return service;                     
                })
              ]
            });
          });
          this.isLoading = false;         
      });
     
  
  }

}
