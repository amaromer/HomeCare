import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AddressService } from '../addresses/address.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

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

  public addresses:{id: string, title: string}[] = [];
  public selAddress;
  public user;

  constructor(
    private CartSrv: CartService,
    private addressSrv: AddressService, 
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authSrv: AuthService,
    private alertCtrl: AlertController,
    private translate: TranslateService) { }

  ngOnInit() {

    this.authSrv.user.subscribe(
      user => {
        if (!user) {
          this.router.navigateByUrl('/auth');
        } else {
          this.user = user;
          console.log(this.user);
        }
      }
    )

    this.cart = this.CartSrv.getCart();

    this.sum = this.cart.reduce(function(sum, item){
        return sum + item.price
    }, 0);

   console.log(this.cart);

    this.addressSrv.getAddresses(this.user.id).subscribe(
      address => {
          //console.log(address);
          address.forEach(
            (item, index) => {
              this.addresses.push({id:item.id, title: item.title});
              if (!index) {
                this.selAddress = item.id;
              }
            });
          //console.log(this.addresses);
      }      
    );

     
  }


  async check() {

    if (this.selAddress) {

      this.loadingCtrl
        .create({
          message: 'Sending Order...'
        })
        .then(loadingEl => {
          loadingEl.present();
          console.log(this.selAddress);
        
          let url="https://www.theplatform-x.com/homecare/index.php/public_calls/generate_order_app";

          let data = {
            customer_id: this.user.client_id,
            location_id: this.selAddress,
            items_data: [...this.cart.map(d => {
              return {
                id: d['id'],
                title: d.item,
                description: "",
                quantity: "1",
                rate: d.price
              }
            })]
          };
        
          console.log(data);

          this.http.post(url,JSON.stringify(data)).subscribe(data => { 
          //     //this.addressSrv.Address.push(address)
              
                  console.log(data);

                loadingEl.dismiss();            
                  this.router.navigate(['/checkout/order-complete']);
          }, error => {
            console.log(error);
            loadingEl.dismiss();
          });

        })
       
    } else {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: this.translate.instant('alert'),
        subHeader: this.translate.instant('no_address'),
        message: this.translate.instant('no_address_message'),
        buttons: [this.translate.instant('ok')]
      });

      await alert.present();
      
    }
  }
}
