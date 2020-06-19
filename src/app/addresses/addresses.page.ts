import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AddressService } from './address.service';
import { Address } from './address.model';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})


export class AddressesPage implements OnInit {

  isLoading: boolean = false;
  adresses: Address[] = [];
  sub: Subscription;
  constructor(private addressSrv: AddressService) { }

  ngOnInit() {
    this.sub = this.addressSrv.getAddresses()
    .subscribe(
      items => {
        this.adresses = [...items];
      }
    );
  }


  ionViewWillEnter() {
  this.isLoading = true; 
   this.sub = this.addressSrv.getAddresses()
    .subscribe(
      items => {
        this.adresses = [...items];
        //this.adresses = [];
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDelete() {
    
  }

}
