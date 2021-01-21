import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoComponent } from './info/info.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RemoveComponent } from './remove/remove.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { InfoYearlyComponent } from './info-yearly/info-yearly.component';
import { InfoMounthlyComponent } from './info-mounthly/info-mounthly.component';
import { InfoDailyComponent } from './info-daily/info-daily.component';
import { InfoHourlyComponent } from './info-hourly/info-hourly.component';
import { RedirectToComponent } from './redirect-to/redirect-to.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangeEmailComponent,
    ChangePassComponent,
    DashboardComponent,
    InfoComponent,
    RegisterComponent,
    ResetComponent,
    RemoveComponent,
    InfoYearlyComponent,
    InfoMounthlyComponent,
    InfoDailyComponent,
    InfoHourlyComponent,
    RedirectToComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
