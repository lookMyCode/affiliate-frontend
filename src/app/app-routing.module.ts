import { RedirectToComponent } from './redirect-to/redirect-to.component';
import { InfoHourlyComponent } from './info-hourly/info-hourly.component';
import { InfoDailyComponent } from './info-daily/info-daily.component';
import { InfoMounthlyComponent } from './info-mounthly/info-mounthly.component';
import { InfoYearlyComponent } from './info-yearly/info-yearly.component';
import { InfoComponent } from './info/info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RemoveComponent } from './remove/remove.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'reset', component: ResetComponent},
	{path: 'change_email', component: ChangeEmailComponent, canActivate: [AuthGuard]},
	{path: 'change_pass', component: ChangePassComponent, canActivate: [AuthGuard]},
	{path: 'remove', component: RemoveComponent, canActivate: [AuthGuard]},
	{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
	{path: 'info/:id', component: InfoComponent, canActivate: [AuthGuard], children: [
		{path: 'yearly', component: InfoYearlyComponent, canActivate: [AuthGuard]},
		{path: 'mounthly', component: InfoMounthlyComponent, canActivate: [AuthGuard]},
		{path: 'daily', component: InfoDailyComponent, canActivate: [AuthGuard]},
		{path: 'hourly', component: InfoHourlyComponent, canActivate: [AuthGuard]},
	]},
	{path: 'redirect/:short', component: RedirectToComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {};