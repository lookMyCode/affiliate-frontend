import { Observable } from 'rxjs';
import { LinkService } from './../service/link.service';
import { TransportService } from './../service/transport.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRes } from '../interfaces';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  id: string;
  linkName: string;

  constructor(
    private transportService: TransportService,
    private route: ActivatedRoute,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params.id;

        this.getLinkById(this.id);
      });
  }

  getLinkById(id: string): void {
    this.linkService.getLinkById(id)
      .subscribe(res => {
        const s = res.statusCode;
        if (s < 200 || s >= 300) throw new Error('Bad response from server');

        this.linkName = res.data.link.name;
        this.transportService.setClicks(res.data.link.clicks);
      });
  }
}
