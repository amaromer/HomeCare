import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

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
  constructor(private lngSrv: LanguageService) { }

  ngOnInit() {
    if (this.lngSrv.SelLang == 'ar') {
      this.data = [...this.data_ar];
    } else {
      this.data = [...this.data_en];
    }
  }

}
