import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../cat.model';

interface cat_data {
  categories: 
  {
    id: string;
    title: string;
    title_ar: string;
    cat_services: {id: string; title: string; rate: string; ar_title: string} [];
    icon: string;
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = "https://theplatform-x.com/homecare/index.php/public_calls/get_cat";
  Cats:Category[] = [
    {id: 1, title: 'Plumbing', artitle: 'سباكة', imageUrl: "assets/images/Group 6.svg", description: "",
      service: [
        {id: 1, title:"bathroom", artitle: "حمام", description:"", price: 15},
        {id: 2, title:"kitchen", artitle:"مطبخ", description:"", price: 12},
        {id: 3, title:"regular", artitle:"عام", description:"", price: 10}
      ]
    },
    {id: 2, title: 'Electricty', artitle:'كهرباء', imageUrl: "assets/images/Group 7.svg", description: "",
      service: [
        {id: 1, title:"Fan", artitle:"مروحة",  description: "", price: 18},
        {id: 2, title:"lights", artitle:"اضاءة", description: "",  price: 17},
        {id: 3, title:"appliences", artitle:"أجهزة", description: "", price: 16}
      ]
    }, 
    {id: 3, title: 'AC Maintaince', artitle:'تكييف', imageUrl: "assets/images/Group 8.svg" , description:"", service:[
      {id: 1, title:"Compresor", artitle:"كمبرسر",  description: "", price: 37},
        {id: 2, title:"lights", artitle:"اضاءة", description: "",  price: 17},
        {id: 3, title:"appliences", artitle:"أجهزة", description: "", price: 16}

    ]},
    {id: 4, title:'Carperentry', artitle:'نجارة', imageUrl: "assets/images/Group 9.svg", description:"", service:[]},
    {id: 5, title:'iron', artitle:'حدادة', imageUrl: "assets/images/Group 9.svg", description:"", service:[]}
  ]; 

 
  constructor(private http:HttpClient) { }

    getCats() {
      //return this.Cats;      
      return this.http.get<cat_data>(this.url);
    }    

    getServices(cat){
      // const services = this.Cats.filter((a) => {
      //   return a.id == cat;
      // });
      // return services;
      



    }

}
