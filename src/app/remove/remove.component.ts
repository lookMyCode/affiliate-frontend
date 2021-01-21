import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss']
})
export class RemoveComponent implements OnInit {
  loading: boolean = false;
  resErr: string;

  form: FormGroup;

  constructor(
    private readonly auth: AuthService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    this.auth.deleteProfile(this.form.value.password)
      .subscribe(res => {
        this.loading = false;
        
        try {
          if (res.statusCode < 200 || res.statusCode >= 300) throw new Error('Bad response from server');

          this.auth.logout();
          this.router.navigate(['/dashboard']);
        } catch (err) {
          try {
            this.resErr = err.error.message;
          } catch (_) {
            this.resErr = err.error;
          }
        }
      }, err => {
        this.loading = false;
        this.resErr = err.error.message;  
      });
  }
}
