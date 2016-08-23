import { Injectable }             from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         NavigationExtras }       from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	if (this.userService.getCurrentUser() !== null) { 
		return true; 
	}

	// Navigate to the login page with extras
	this.router.navigate(['/users']);
	return false;
  }
}
