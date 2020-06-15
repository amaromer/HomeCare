import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from '../address.model';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AddressService } from '../address.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  form: FormGroup;


  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private addressSrv: AddressService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      location: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onLocationPicked(location: Address) {
    this.form.patchValue({ location: location.location });
    console.log(this.form.value);
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating place...'
      })
      .then(loadingEl => {
        loadingEl.present();

        let address: Address = {
          title: this.form.value.title,
          address: this.form.value.description,
          staticMapImageUrl: this.form.value.staticMapImageUrl,
          location: {lat: this.form.value.location.lat, lng: this.form.value.location.lng},
          user_id: 1
        }

        this.addressSrv.addAddress(address).subscribe(
         
            () => { 
              //this.addressSrv.Address.push(address)
              
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/addresses']);
            }
        );
        
        

        // this.placesService
        //   .uploadImage(this.form.get('image').value)
        //   .pipe(
        //     switchMap(uploadRes => {
        //       return this.placesService.addPlace(
        //         this.form.value.title,
        //         this.form.value.description,
        //         +this.form.value.price,
        //         new Date(this.form.value.dateFrom),
        //         new Date(this.form.value.dateTo),
        //         this.form.value.location,
        //         uploadRes.imageUrl
        //       );
        //     })
        //   )
        //   .subscribe(() => {
        //     loadingEl.dismiss();
        //     this.form.reset();
        //     this.router.navigate(['/places/tabs/offers']);
        //   });
      });
  }

}
