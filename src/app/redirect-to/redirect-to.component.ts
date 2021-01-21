import { LinkService } from './../service/link.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect-to',
  templateUrl: './redirect-to.component.html',
  styleUrls: ['./redirect-to.component.scss']
})
export class RedirectToComponent implements OnInit {
  err: boolean;

  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.redirectToOriginalLink(params.short);
      })
    // console.log(window.location.host + '/')
  }

  redirectToOriginalLink(shortLink: string) {
    this.linkService.getLinkByShortName(shortLink)
      .subscribe(res => {
        try {
          if (res.statusCode < 200 || res.statusCode >=300) throw new Error('Bad response from server');

          const {originalLink} = res.data;
          window.location = originalLink;
        } catch (err) {
          this.err = true;
          console.error(err);
        }
      }, err => {
        this.err = true;
        console.error(err);
      });
  }
}
