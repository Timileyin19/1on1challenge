import { DashboardPlayComponent } from './dashboard-play/dashboard-play.component';
import { DashboardMyGamesComponent } from './dashboard-my-games/dashboard-my-games.component';
import { DashboardMyAccountComponent } from './dashboard-my-account/dashboard-my-account.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardChallengeComponent } from './dashboard-challenge/dashboard-challenge.component';

const routes: Routes = [
  // {path: '', component: LoginComponent },
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegistrationFormComponent },
  {path: 'dashboard', component: DashboardHomeComponent },
  {path: 'dashboard/account', component: DashboardMyAccountComponent },
  {path: 'dashboard/challenge', component: DashboardChallengeComponent },
  {path: 'dashboard/game', component: DashboardMyGamesComponent },
  {path: 'dashboard/play', component: DashboardPlayComponent },
  {path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
