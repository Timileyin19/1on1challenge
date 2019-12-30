import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, 
    private router: Router, 
    private alertify: AlertifyService) {}

  canActivate():  boolean  {
    if (this.authService.adminLoggedIn()) {
      return true;
    }

    this.alertify.message('The Link Entered in only for Admin'); 
    this.router.navigate(['/1on1-admin']); 
    return false;
  }
  
}
