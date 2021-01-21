import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  form: FormGroup;

  loading: boolean;
  passwordsAreEqual: boolean = false;

  resErr: string;
  resSuccess: string;

  constructor(
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPass: new FormControl('', [Validators.required]),
      newPass1: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPass2: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  arePasswordsEqual(): void {
    this.passwordsAreEqual = this.form.controls.newPass1.value === this.form.controls.newPass2.value;
  }

  submit(): void {
    if (this.form.invalid) return;

    if (this.form.controls.newPass1.value !== this.form.controls.newPass1.value) return;

    this.loading = true;

    this.auth.changePass(this.form.value.oldPass, this.form.value.newPass1)
      .subscribe(res => {
        this.loading = false;

        try {
          if (res.statusCode < 200 || res.statusCode >= 300) throw new Error('Bad response from server');

          const token: string = res.data.token;
          this.auth.setToken(token);

          this.resErr = null;
          this.resSuccess = "Success! Your password has benn changed!";
        } catch (err) {
          try {
            this.resSuccess = null;
            this.resErr = err.error.message;
          } catch (_) {
            this.resSuccess = null;
            this.resErr = err.error;
          }
        }
      }, err => {
        this.loading = false;

        this.resSuccess = null;
        this.resErr = err.error.message;
      });
  }
}
