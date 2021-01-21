import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  loading: boolean = false;

  resErr: string;
  resSuccess: string;

  form: FormGroup;
  
  constructor(
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    this.auth.changeEmail(this.form.value.email, this.form.value.password)
      .subscribe(res => {
        this.loading = false;

        try {
          if (res.statusCode < 200 || res.statusCode >= 300) throw new Error('Bad response from server');

          const token: string = res.data.token;
          this.auth.setToken(token);

          this.form.reset();

          this.resErr = null;
          this.resSuccess = 'Success! Your email has benn changed!';
        } catch (err) {
          try {
            this.resErr = err.error.message;
          } catch (_) {
            this.resErr = err.error;
          }
        }
      }, err => {
        this.loading = false;

        this.resSuccess = null;
        this.resErr = err.error.message;
      });
    // this.auth.login(this.form.value.email, this.form.value.password)
    //   .subscribe(res => {
    //     this.loading = false;

    //     try {
    //       if (res.statusCode < 200 || res.statusCode >= 300) throw new Error('Bad response from server');

    //       const token: string = res.data.token;
    //       this.auth.setToken(token);

    //     } catch (err) {
    //       try {
    //         this.resErr = err.error.message;
    //       } catch (_) {
    //         this.resErr = err.error;
    //       }
    //     }
    //   }, err => {
    //     this.loading = false;
    //     this.resErr = err.error.message;
    //   });
  }
}
