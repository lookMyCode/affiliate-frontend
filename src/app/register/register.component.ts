import { AuthService } from './../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  loading: boolean;
  passwordsAreEqual: boolean = false;

  resErr: string;

  constructor(
    private readonly auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass1: new FormControl('', [Validators.required, Validators.minLength(6)]),
      pass2: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  arePasswordsEqual(): void {
    this.passwordsAreEqual = this.form.controls.pass1.value === this.form.controls.pass2.value;
  }

  submit(): void {
    if (this.form.invalid) return;

    if (this.form.controls.pass1.value !== this.form.controls.pass2.value) return;

    this.loading = true;

    this.auth.register(this.form.controls.email.value, this.form.controls.pass1.value)
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
