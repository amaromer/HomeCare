import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Address, location } from 'src/app/addresses/address.model';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Capacitor, Plugins } from '@capacitor/core';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<Address>();
  @Input() showPreview = false;
  selectedLocationImage: string;
  isLoading = false;

  constructor(  
    private modalCtrl: ModalController,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private transSrv: TranslateService) { }

  ngOnInit() {}
  
  onPickLocation() {
    this.actionSheetCtrl
      .create({
        header: this.transSrv.instant('please_choose'),
        buttons: [
          {
            text: this.transSrv.instant('auto_locate'),
            handler: () => {
              this.locateUser();
            }
          },
          {
            text: this.transSrv.instant('pick_on_map'),
            handler: () => {
              this.openMap();
            }
          },
          { text: this.transSrv.instant('cancel'), role: 'cancel' }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    this.isLoading = true;
    Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {
        const coordinates: location = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude
        };
        this.createPlace(coordinates.lat, coordinates.lng);
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        this.showErrorAlert();
      });
  }

  private showErrorAlert() {
    this.alertCtrl
      .create({
        header: 'Could not fetch location',
        message: 'Please use the map to pick a location!',
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  private openMap() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        const coordinates: location = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
        this.createPlace(coordinates.lat, coordinates.lng);
      });
      modalEl.present();
    });
  }

  private createPlace(lat: number, lng: number) {
    const pickedLocation: Address = {
      id: "",
      location: {
      lat: lat,
      lng: lng},
      address: null,
      staticMapImageUrl: null,
      title: null,
      user_id: 1
    };
    this.isLoading = true;
    this.getAddress(lat, lng)
      .pipe(
        switchMap(address => {
          pickedLocation.address = "address";
          return of(
            this.getMapImage(pickedLocation.location.lat, pickedLocation.location.lng, 14)
          );
        })
      )
      .subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          environment.googleMapsAPIKey
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }
}
