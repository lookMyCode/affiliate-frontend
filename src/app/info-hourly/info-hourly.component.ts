import { Component, OnInit } from '@angular/core';
import { TransportService } from '../service/transport.service';

@Component({
  selector: 'app-info-hourly',
  templateUrl: './info-hourly.component.html',
  styleUrls: ['./info-hourly.component.scss']
})
export class InfoHourlyComponent implements OnInit {
  RANGE: number = 1000 * 60 * 60 * 24; // 24 hours
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
          const t = '' + new Date( date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() ).getTime();
          clicksObj[t] = clicksObj[t] ? clicksObj[t] + 1 : 1;
        });

        this.clicks = Object.entries(clicksObj);
        console.log(this.clicks);
      });
  }
}
