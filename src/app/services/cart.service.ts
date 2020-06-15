import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart = [];
  constructor() { }

  getProduct() {
    //return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }

  emptyCart() {
    this.cart = [];
  }
}
