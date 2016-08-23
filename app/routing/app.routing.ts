import { Routes, RouterModule } from '@angular/router';

import { FlyersComponent } from '../components/flyers.component';
import { DashboardComponent } from '../components/dashboard.component';
import { FlyerDetailComponent } from '../components/flyer-detail.component';
import { UserComponent } from '../components/user.component';

const appRoutes: Routes = [
	{
		path: 'flyers',
		component: FlyersComponent
	},
	{
		path: '',
		redirectTo: '/users',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'detail/:id',
		component: FlyerDetailComponent
	},
	{
		path: 'users',
		component: UserComponent
	}
];

export const routing = RouterModule.forRoot(appRoutes);
