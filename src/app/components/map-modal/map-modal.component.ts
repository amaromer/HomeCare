import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;
  @Input() center = { lat:23.595245, lng: 58.357450 };
  @Input() selectable = true;
  @Input() closeButtonText = this.translate.instant('cancel');
  @Input() title = this.translate.instant('pick_location');
  clickListener: any;
  googleMaps: any;
  constructor( 
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private translate: TranslateService) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then(googleMaps => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: this.center,
          zoom: 16
        });       

        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visible');          
        });

        if (this.selectable) {
          this.clickListener = map.addListener('click', event => {
            const selectedCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            this.modalCtrl.dismiss(selectedCoords);
          });
        } else {
          const marker = new googleMaps.Marker({
            position: this.center,
            map: map,
            title: 'Picked Location'
          });
          marker.setMap(map);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.googleMaps.event.removeListener(this.clickListener);
    }
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {      
      return Promise.resolve(googleModule.maps);
    }
   
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsAPIKey;
      //script.async = true;
      //script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {         
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

}
