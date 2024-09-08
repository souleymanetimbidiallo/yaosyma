import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {

      // Les données fictives pour l'illustration
      userCount: number = 120;
      orderCount: number = 75;
      productCount: number = 30;


  constructor() {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('AdminDashboardComponent initialized');
  }

}
