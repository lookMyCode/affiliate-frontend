import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LinkService } from './../service/link.service';
import { Component, OnInit } from '@angular/core';
import { ILink } from '../interfaces';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;

  links: ILink[];

  form: FormGroup;

  constructor(
    private readonly linkService: LinkService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required])
    });

    this.getLinks();
  }

  getLinks(): void {
    this.loading = true;

    this.linkService.getLinks()
      .subscribe(res => {
        this.loading = false;

        try {
          if (res.statusCode !== 200) {
            throw new Error('Bad response from server');
          }

          this.links = res.data.links;
        } catch (err) {
          console.error(err);
        }
      }, err => {
        this.loading = false;

        console.error(err);
      });
  }

  deleteLink(id: string): void {
    this.loading = true;

    this.linkService.deleteLink(id)
      .subscribe(res => {
        this.loading = false;

        try {
          if (res.statusCode < 200 || res.statusCode >= 300) return;

          this.links = this.links.filter(link => link._id !== id);
        } catch (err) {
          console.error(err);
        }
      }, err => {
        this.loading = false;

        console.error(err);
      })
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    this.linkService.addLink(this.form.value.name, this.form.value.url)
      .subscribe(res => {
        this.loading = false;
        console.log(res)

        try {
          if (res.statusCode < 200 || res.statusCode >= 300) throw new Error('Bad response from server');

          this.form.reset();
          this.links.push(res.data.link);
        } catch (err) {
          console.error(err);
        }
      }, err => {
        this.loading = false;

        console.error(err);
      });
  }

  logout(): void {
    this.loading = true;
    this.auth.logout();
  }
}
