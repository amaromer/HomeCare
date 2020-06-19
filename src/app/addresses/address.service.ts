import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from './address.model';
import { last, map, switchMap } from 'rxjs/operators';

interface backend_address {
  locations_data:{
    id: string;
    title: string;
    lat: string;
    log: string;
    address: string;
    client_id: string;
  }[]
}


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url = "https://theplatform-x.com/homecare/index.php/public_calls/";

  Address: Address[] = [
    {id: "1", title: "Home", address: "Al khwair 33", location: {lat: 25.123123, lng: 12.232393}, staticMapImageUrl:"", user_id: 1},
    {id: "2", title: "Office", address: "Uthaiba 18 nov st", location: {lat: 25.123123, lng: 12.232393}, staticMapImageUrl: "", user_id: 1}
  ];

  
  constructor(private http: HttpClient) { }

  getAddresses() {
   
    let url = this.url + "show_customer_locations";
    return this.http.get<backend_address>(url)
    .pipe(
      map(data => {
        let items: Address[] = []
        data.locations_data.forEach(item => {
          items.push({id:item.id ,title: item.title, address:item.address, location:{lat: +item.lat, lng: +item.log}, staticMapImageUrl:"", user_id:+item.client_id})
        });
        return items;
      })
    );

  }

  addAddress(address: Address) {   

    const url = this.url + "register_customer_locations";
        
    let body = {     
      title: address.title,
      lat: address.location.lat,
      log: address.location.lng,
      user_id: address.user_id,
      address: address.address
    };

    return this.http.post(url,JSON.stringify(body));

    
  }
}
