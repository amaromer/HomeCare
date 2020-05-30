import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(private catSrv:CategoriesService) { }

  ngOnInit() {
    this.catSrv.getCats().subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
