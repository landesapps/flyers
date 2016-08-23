import { Routes, RouterModule } from '@angular/router';

import { FlyersComponent } from '../components/flyers.component';
import { DashboardComponent } from '../components/dashboard.component';
import { FlyerDetailComponent } from '../components/flyer-detail.component';
import { UserComponent } from '../components/user.component';

import { AuthGuard } from '../services/auth-guard.service';

const appRoutes: Routes = [
	{
		path: 'flyers',
		component: FlyersComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/users',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'detail/:id',
		component: FlyerDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'users',
		component: UserComponent
	}
];

export const appRoutingProviders: any[] = [
	AuthGuard,
];

export const routing = RouterModule.forRoot(appRoutes);
