import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { AllUsersResolver } from './_resolvers/all-users.resolver';
import { UsersComponent } from './admin/users/users.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
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
import { AuthGuard } from './_guards/auth.guard';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';

const routes: Routes = [
  // {path: '', component: LoginComponent },
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegistrationFormComponent },
  {path: 'validate/email', component: EmailValidationComponent },

  // Using just one Auth Guard to protect multiple Routes
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardHomeComponent },
      {path: 'dashboard/account', component: DashboardMyAccountComponent },
      {path: 'dashboard/challenge', component: DashboardChallengeComponent },
      {path: 'dashboard/game', component: DashboardMyGamesComponent },
      {path: 'dashboard/play', component: DashboardPlayComponent },
    ]
  },

  // Admin Route
  { path: '1on1-admin', component: AdminLoginComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'admin/dashboard', component: AdminDashboardComponent },
      { path: 'admin/users', component: UsersComponent, resolve: { users: AllUsersResolver} },
      { path: 'admin/user/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver} }
    ]
  },
  
  {path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
