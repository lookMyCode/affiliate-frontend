import { LinkService } from './../service/link.service';
import { TransportService } from './../service/transport.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-yearly',
  templateUrl: './info-yearly.component.html',
  styleUrls: ['./info-yearly.component.scss']
})
export class InfoYearlyComponent implements OnInit {
  RANGE: number = 1000 * 60 * 60 * 24 * 365 * 5; // 5 years
  clicks: any[] = [];

  constructor(
    private transportService: TransportService
  ) { }

  ngOnInit(): void {
    this.getClicks();
  }

  getClicks() {
    this.transportService.getClicks$()
      .subscribe(clicks => {
        const arr: Date[] = [];
        const clicksObj: any = {};
        
        clicks.forEach(each => {
          let date: Date = new Date(each);
          
          if ( Date.now() - this.RANGE < date.getTime() ) arr.push(date);
        });

        arr.forEach(date => {
          const fy = date.getFullYear();
          clicksObj[fy] = clicksObj[fy] ? clicksObj[fy] + 1 : 1;
        });

        this.clicks = Object.entries(clicksObj);
        console.log(this.clicks);
      });
  }
}
