import { NodeService } from './../service/node.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  id: string;

  constructor(
    
  ) {}

  ngOnInit(): void {
    
  }
}
