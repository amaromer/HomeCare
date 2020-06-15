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

  constructor(private CartSrv: CartService, 
              private router:Router, 
              private catSrv: CategoriesService, 
              private lngSrv: LanguageService) { }

  ngOnInit() {  

    if (this.lngSrv.SelLang == 'ar') {
      this.ar = true;
    }

    const path = window.location.pathname.split('categories/')[1];    
    var srv = this.catSrv.getServices(path);   
    this.services = srv[0].service;
    console.log(this.services);
    this.services.forEach(function(item){
      item.isChecked = false;
    })
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

     //this.router.navigateByUrl('/chekout');
     //console.log(this.CartSrv.getCart());





  }

}
