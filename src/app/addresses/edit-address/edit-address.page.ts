import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../address.service';
import { filter } from 'rxjs/operators';
import { Address } from '../address.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  form: FormGroup;
  Address: Address;
  isLoading: boolean = true;
  address_title;
  user;

  constructor(
    private addressSrv:AddressService,  
    private route: ActivatedRoute, 
    private autSrv: AuthService, 
    private router: Router ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(parm => {
      this.address_title = parm.get('place_id');
    });

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

    this.addressSrv.getAddresses(this.user).subscribe(
        
        items => {
          this.isLoading = true;
          this.Address = items.find(item => {
            return item.title == this.address_title;
          });
          console.log(this.Address);

          this.form = new FormGroup({
            title: new FormControl(this.Address.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.Address.address, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            }),
            location: new FormControl(this.Address.location, { validators: [Validators.required] })
          });

          this.isLoading = false;

        }
    )

   
  }

  onLocationPicked(location: Address) {
    this.form.patchValue({ location: location.location });
    console.log(this.form.value);
  }

}
