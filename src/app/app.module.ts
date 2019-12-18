import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardMyAccountComponent } from './dashboard-my-account/dashboard-my-account.component';
import { DashboardChallengeComponent } from './dashboard-challenge/dashboard-challenge.component';
import { DashboardMyGamesComponent } from './dashboard-my-games/dashboard-my-games.component';
import { DashboardPlayComponent } from './dashboard-play/dashboard-play.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrationFormComponent,
    LoginComponent,
    HomeComponent,
    DashboardHomeComponent,
    DashboardMyAccountComponent,
    DashboardChallengeComponent,
    DashboardMyGamesComponent,
    DashboardPlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
