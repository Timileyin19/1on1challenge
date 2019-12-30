import { AllUsersResolver } from './_resolvers/all-users.resolver';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


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
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthGuard } from './_guards/auth.guard';
import { UsersComponent } from './admin/users/users.component';
import { GamesComponent } from './admin/games/games.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';


export function tokenGetter() {
  return localStorage.getItem('token');
}


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
    DashboardPlayComponent,
    EmailValidationComponent,
    UsersComponent,
    GamesComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    SidebarComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://1on1stakeapi.23esm.com'],
        blacklistedRoutes: ['http://1on1stakeapi.23esm.com/api/Auth']
      }
    })
  ],
  providers: [
    ErrorInterceptorProvider,
    AlertifyService, 
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    AllUsersResolver,
    UserDetailResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
