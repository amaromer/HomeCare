import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;

  public Items = [
    { name: "phone", placeHolder: "phone", type: "tel", bindingText: "" },
    { name: "email", placeHolder: "email", type: "email", bindingText: "" },   
    { name: "username", placeHolder: "name", type: "name", bindingText: "" },
    { name: "password", placeHolder: "Password", type: "password", bindingText: "" }   
    
  ];

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSrv.user.subscribe(
      user => {
        if (!user) {
          this.router.navigateByUrl('/home');
        } else {
          this.user = user;
          console.log(this.user);
          this.Items.forEach(item => {
            item.bindingText = user[item.name];
          });
          console.log(this.Items);

        }

      }
    )
  }

  update() {
    
  }

}
