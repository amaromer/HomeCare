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
  public user;

  Address: Address[] = [
    {id: "1", title: "Home", address: "Al khwair 33", location: {lat: 25.123123, lng: 12.232393}, staticMapImageUrl:"", user_id: 1},
    {id: "2", title: "Office", address: "Uthaiba 18 nov st", location: {lat: 25.123123, lng: 12.232393}, staticMapImageUrl: "", user_id: 1}
  ];

  
  constructor(private http: HttpClient) { }

  getAddresses(client_id) {
   
    let data = {user_id: client_id};
    let url = this.url + "show_customer_locations";
    return this.http.post<backend_address>(url, data)
    .pipe(
      map(data => {
        let items: Address[] = [];
       
        if (data.locations_data) {
          data.locations_data.forEach(item => {
            items.push({id:item.id ,title: item.title, address:item.address, location:{lat: +item.lat, lng: +item.log}, staticMapImageUrl:"", user_id:+item.client_id})
          });
        }
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

  deleteAddress(address_id: string) {
    const url = this.url + "delete_customer_locations";
    let body = {
      id: address_id
    };

    return this.http.post(url,JSON.stringify(body));
  }
}
