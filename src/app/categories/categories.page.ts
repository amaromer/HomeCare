import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';
import { LanguageService } from '../services/language.service';
import { service } from '../service.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  services= [];
  ar: boolean;
  isLoading: boolean = false;

  constructor(private CartSrv: CartService, 
              private router:Router, 
              private catSrv: CategoriesService, 
              private lngSrv: LanguageService) { }

  ngOnInit() {  

    if (this.lngSrv.SelLang == 'ar') {
      this.ar = true;
    }

    const path = window.location.pathname.split('categories/')[1];    
    this.isLoading = true; 
    this.catSrv.getCats().subscribe(
      data => {
        let cat = data.categories.filter(cat => {
          return cat.id == path
        });       
        //console.log(cat);
        cat.forEach(item => {
          this.services = [...item.cat_services.map(item => {
            let service: service = {
              id: +item.id,
              title: item.title,
              artitle: item.ar_title,
              description: "",
              price: +item.rate
            }
          return service;    
          })];
        });
        this.isLoading = false;
      }
    );   
  }

  checkout() {
  
   this.CartSrv.emptyCart();
   this.services.forEach(function(service){
       if (service.isChecked) {
          var title = service.title;
          if (this.ar) {
             title = service.artitle;
          } 
          this.CartSrv.addProduct({
            id: service.id,
            item: title,
            price: service.price
          })
       }
     }, this);

    
  }

}
