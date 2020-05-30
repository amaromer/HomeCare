import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = "https://theplatform-x.com/homecare/index.php/public_calls/get_cat";
  constructor(private http:HttpClient) { }

  getCats() {
      return this.http.get(this.url);
  }
}
