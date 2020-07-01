import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { exit } from 'process';
//import { Console } from 'console';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {

    this.authService.userIsAuthenticated.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/home');
      }
    });

   

  }

  authenticate(email: string, password: string, email2?: string, name?: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          console.log("login");
          authObs = this.authService.login(email, password);
        } else {
          console.log('signup');
          authObs = this.authService.signup(email, password, email2, name);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();           
            window.location.reload();
          },
          errRes => {
            loadingEl.dismiss();
            console.log(errRes);
            //const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            // if (code === 'EMAIL_EXISTS') {
            //   message = 'This email address exists already!';
            // } else if (code === 'EMAIL_NOT_FOUND') {
            //   message = 'E-Mail address could not be found.';
            // } else if (code === 'INVALID_PASSWORD') {
            //   message = 'This password is not correct.';
            // }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const email2 = form.value.email2;
    const name = form.value.username;

    if (email2 && name){
      this.authenticate(email, password, email2, name);
      console.log(email2);
      console.log(name);
      return
    }

    this.authenticate(email, password);
    //form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
