import { Component, OnInit } from '@angular/core';
import { TransportService } from '../service/transport.service';

@Component({
  selector: 'app-info-mounthly',
  templateUrl: './info-mounthly.component.html',
  styleUrls: ['./info-mounthly.component.scss']
})
export class InfoMounthlyComponent implements OnInit {
  RANGE: number = 1000 * 60 * 60 * 24 * 365; // 1 year
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
          const t = '' + new Date( date.getFullYear(), date.getMonth() ).getTime();
          clicksObj[t] = clicksObj[t] ? clicksObj[t] + 1 : 1;
        });

        this.clicks = Object.entries(clicksObj);
        console.log(this.clicks);
      });
  }
}
