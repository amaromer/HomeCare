import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

interface cart {
  item: string
  price: number
}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

 

  public sum: number;
  public cart: cart[] = [];

  constructor(private CartSrv: CartService) { }

  ngOnInit() {
    this.cart = this.CartSrv.getCart();

    this.sum = this.cart.reduce(function(sum, item){
        return sum + item.price
    }, 0);
  }

}
