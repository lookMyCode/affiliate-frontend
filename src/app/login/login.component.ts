import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  resErr: string;

  form: FormGroup;

  constructor(
    private readonly auth: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.auth.login(this.form.value.email, this.form.value.password)
      .subscribe(res => {
        this.loading = false;

        try {
          if (res.statusCode < 200 || res.statusCode >= 300) throw new Error('Bad response from server');

          const token: string = res.data.token;
          this.auth.setToken(token);

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
