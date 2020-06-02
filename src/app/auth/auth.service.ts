import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

import { User } from './user.model';

export interface AuthResponseData {
  userId: string;
  email: string;
  username: string;
  phone: string;      
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;
  private url = "https://theplatform-x.com/homecare/index.php/public_calls/authenticate_app";

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.id;
        } else {
          return false;
        }
      })
    );
  }

 

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          userId: string,    
          email: string,
          username: string,
          phone: string
        };
      
        const user = new User(
          parsedData.userId,
          parsedData.email,          
          parsedData.username,
          parsedData.phone
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);        
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.url,
        { email: email, password: password }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.url,
        { phone: email, password: password }
      )
      .pipe(        
        tap(this.setUserData.bind(this))       
      );
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  private setUserData(userData) {
   
    const user = new User(
      userData.user_info.id,
      userData.user_info.email,
      userData.user_info.first_name,
      userData.user_info.phone       
    );
    
    this._user.next(user);
    this.storeAuthData(
      userData.user_info.id,      
      userData.user_info.email,
      userData.user_info.first_name,
      userData.user_info.phone      
    );
  }

  private storeAuthData(
    userId: string,    
    email: string,
    username: string,
    phone: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      phone: phone,
      email: email,
      username: username
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
}
