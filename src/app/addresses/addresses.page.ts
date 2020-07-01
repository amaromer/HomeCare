import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AddressService } from './address.service';
import { Address } from './address.model';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})


export class AddressesPage implements OnInit {

  isLoading: boolean = false;
  adresses: Address[] = [];
  sub: Subscription;
  user;
  constructor(
    private addressSrv: AddressService, 
    private autSrv: AuthService, 
    private router: Router,
    private alertCtrl: AlertController,
    private translate: TranslateService) { }

  


  ngOnInit() {
    this.autSrv.userIsAuthenticated.subscribe(
      user => {
        if (!user) {
          this.router.navigateByUrl('/home');
        } else {
           this.autSrv.user.subscribe(user => {
             this.user = user.id
           });
        }
      }
    )

    this.sub = this.addressSrv.getAddresses(this.user)
    .subscribe(
      items => {
        this.adresses = [...items];
      },
      err => {
        console.log(err);
      }
    );
  }


  ionViewWillEnter() {
    this.load_address();
  }

  load_address() {
    this.isLoading = true; 
    this.sub = this.addressSrv.getAddresses(this.user)
     .subscribe(
       items => {
         this.adresses = [...items];
         //this.adresses = [];
         this.isLoading = false;
       },
       err => {
         console.log(err);
       }
     );
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDelete(address_id: string) {
    this.addressSrv.deleteAddress(address_id).subscribe(
      async data => {
        console.log(data);
        if (data['error'] == 'used') {
          
          const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: this.translate.instant('alert'),
            subHeader: this.translate.instant('not_deleted'),
            message: this.translate.instant('not_delete_message'),
            buttons: [this.translate.instant('ok')]
          });
      
          await alert.present();
        }
      }
    );

    this.load_address();
    
  }

}
