import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.page.html',
  styleUrls: ['./appointment-detail.page.scss'],
})
export class AppointmentDetailPage implements OnInit {
  order_id;
  isLoading = false;
  order;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(parm => {
      this.order_id = parm.get('order-id');
    });

    let url = "https://www.theplatform-x.com/homecare/index.php/public_calls/list_my_orders";
    let body = {
      customer_id: 1
    }

    this.isLoading = true;
    this.http.post(url, JSON.stringify(body)).subscribe(
      data => {
        //console.log(data);
        let order = data.invoice_data.filter(item =>
          item.id == this.order_id
        );

        
        this.order = [...order.map(item => {
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
        })][0];       
        console.log(this.order);
        this.isLoading = false;
      },
      error => {
        console.log(error);
      }
    )



  }

}
