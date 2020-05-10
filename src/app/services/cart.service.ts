import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data = [
    {
      category: 'pizza',
      expanded: true,
      products: [
        {id: 0, name: 'salami', price: '8'},
        {id: 1, name: 'meat', price: '5'},
        {id: 2, name: 'chicken', price: '4'}
      ]
    },
    {
      category: 'pasta',      
      products: [
        {id: 3, name: 'cheese', price: '1.5'},
        {id: 4, name: 'cream', price: '2.6'}       
      ]
    },
    {
      category: 'salad',      
      products: [
        {id: 5, name: 'green', price: '7'},
        {id: 6, name: 'tomato', price: '12'},
        {id: 7, name: 'tuna', price: '4'}
      ]
    }
  ];
  private cart = [];
  constructor() { }

  getProduct() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }
}
