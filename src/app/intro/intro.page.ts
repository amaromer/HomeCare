import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

// For Static Theme Apply
const themes = {
  black: {
    primary: 'black',
    secondary: 'black',
    tertiary: 'white',
    light: 'black',
    dark: 'black',
    medium: 'black',
  }
};

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) autoSlides: IonSlides;
  indexGlobal: any;
  visiable = false;
  public slides = [
    { image: "assets/becrux/images/starter/home.png", title: "Home Pages", icon: "home", text: "Iorem ipsum dolor sit amet, consectrtur adipiscing elit.Vivamus." },
    { image: "assets/becrux/images/starter/shop.png", title: "Shop Pages", icon: "cash", text: "Iorem ipsum dolor sit amet, consectrtur adipiscing elit.Vivamus." },
    { image: "assets/becrux/images/starter/category.png", title: "Category Pages", icon: "apps", text: "Iorem ipsum dolor sit amet, consectrtur adipiscing elit.Vivamus." },
    { image: "assets/becrux/images/starter/order.png", title: "Order Page", icon: "browsers", text: "Iorem ipsum dolor sit amet, consectrtur adipiscing elit.Vivamus." }
  ];
  constructor(public navCtrl: NavController, public splashscreen: SplashScreen) {}
  ngOnInit() {
  }
 
  ionViewWillLeave() {
    //for tab bar
    //const tabBar = document.getElementById('myTabBarBecrux');
    //tabBar.style.display = 'flex';
  }

  ionViewDidEnter() {
    this.splashscreen.hide();
    this.autoSlides.startAutoplay();
  }

  slideChanged() {
    this.autoSlides.getActiveIndex().then(index => {
      if (index == 4) {
        this.visiable = true;
      }
      else {
        this.visiable = false;
      }
    });
  }

  goToHomeEcom() {
    this.navCtrl.navigateForward('/home');
  }
}
