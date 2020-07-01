import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

  user;
  isLoading: boolean = false;
  data_en = [
    {
      date: "13 June",
      time: "11:00 AM",
      Address: "Home",
      job_cat: "Plumbing",
      job_price: "12.000"
    },
    {
      date: "15 August",
      time: "09:00 AM",
      Address: "Office",
      job_cat: "Electricity",
      job_price: "25.000"
    }
  ];
  data_ar = [
    {
      date: "13 يوليو",
      time: "11:00 ص",
      Address: "المنزل",
      job_cat: "السباكة",
      job_price: "12.000"
    },
    {
      date: "15 أغسطس",
      time: "09:00 ص",
      Address: "المكتب",
      job_cat: "كهرباء",
      job_price: "25.000"
    }
  ]
  data = [];
  constructor(private lngSrv: LanguageService, private http: HttpClient, private authSrv: AuthService, private router: Router) { }

  ngOnInit() {

    this.authSrv.userIsAuthenticated.subscribe(
      user => {
        if (!user) {
          this.router.navigateByUrl('/home');
        } else {
           this.authSrv.user.subscribe(user => {
             this.user = user.id
           });
        }
      }
    )

    // if (this.lngSrv.SelLang == 'ar') {
    //   this.data = [...this.data_ar];
    // } else {
    //   this.data = [...this.data_en];
    // }

    let url = "https://www.theplatform-x.com/homecare/index.php/public_calls/list_my_orders";
    let body = {
      customer_id: this.user
    }

    this.isLoading = true;
    this.http.post(url, JSON.stringify(body)).subscribe(
      data => {
        console.log(this.user);
        if (data['invoice_data']) {
          //console.log(data);
          let filtered = data['invoice_data'].filter(item => item.invoice_value != 0);
         
          this.data = [...filtered.map(item => {
            return {
              date: item.bill_date,
              id: item.id,
              address: item.loc_title,
              total: item.invoice_value,
              items: [...item.items_data.map(d => {
                return {
                  id: d.id,
                  item: d.title,
                  price: d.rate
                }
              })]
            }
          })];
        }
        this.isLoading = false;
      },
      error => {
        console.log(error);
      }
    )

    
  }

}
