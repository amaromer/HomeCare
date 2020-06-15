import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  sliderConfig = [{
    initialSlide: 1,
    speed: 300
  }];
  sliders = [
    {id: 0, image: "assets/slides/1.jpg", item: "First Slide"},
    {id: 1, image: "assets/slides/2.jpg", item: "Second Slide"},
    {id: 2, image: "assets/slides/3.jpg", item: "Third Slide"}
  ];

  constructor() { }

  ngOnInit() {   
  }

  slidesDidLoad(slides: IonSlides) {
    console.log("slide loaded");
    slides.startAutoplay();
  }

  goToCartPage() {}


}
