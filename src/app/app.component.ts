import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public user = null;
  public appPages = [
    {
      title: 'PAGES.home',
      url: '/home',
      icon: 'mail',
      public: true
    },
    {
      title: 'PAGES.appointment',
      url: '/appointments',
      icon: 'paper-plane',
      public: false
    },
    {
      title: 'PAGES.profile',
      url: '/profile',
      icon: 'heart',
      public: false
    },
    {
      title: 'PAGES.addresses',
      url: '/addresses',
      icon: 'archive',
      public: false
    },
    {
      title: 'PAGES.login',
      url: '/auth',
      icon: 'log-in',
      public: true
    },
    {
      title: 'PAGES.language',
      url: '/setting',
      icon: 'language',
      public: true
    }    
  ];
  
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private LanguageService: LanguageService,
    private authSrv: AuthService    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.LanguageService.SetInitialAppLanguage();      
    });
  }

  ngOnInit() {

    this.checklogin();

    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url === path);
    }
  } 

  

  logout() {
    this.authSrv.logout();
    window.location.reload();
  }


  checklogin(){
    this.authSrv.autoLogin().subscribe(
      user => {
        if (!user) {
          this.appPages = this.appPages.filter(item => item.public);
          
        } else {
          //this.appPages[this.appPages.findIndex(item => item.icon == 'log-in')]
          this.appPages.splice(this.appPages.findIndex(item => item.icon == 'log-in'), 1);
          this.authSrv.user.subscribe(
            data => {this.user = data}
          );
          
          console.log(this.user);
        }
      }
    );
  }
  
}
