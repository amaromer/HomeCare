import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'PAGES.home',
      url: '/home',
      icon: 'mail'
    },
    {
      title: 'PAGES.appointment',
      url: '/appointments',
      icon: 'paper-plane'
    },
    {
      title: 'PAGES.profile',
      url: '/profile',
      icon: 'heart'
    },
    {
      title: 'PAGES.addresses',
      url: '/addresses',
      icon: 'archive'
    },
    {
      title: 'PAGES.login',
      url: '/auth',
      icon: 'log-in'
    },
    {
      title: 'PAGES.language',
      url: '/setting',
      icon: 'language'
    }    
  ];
  
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private LanguageService: LanguageService    
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
    const path = window.location.pathname;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url === path);
    }
  } 
  
}
