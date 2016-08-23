import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { AppComponent }  from '../components/app.component';
import { FlyerDetailComponent } from '../components/flyer-detail.component';
import { FlyersComponent } from '../components/flyers.component';
import { DashboardComponent } from '../components/dashboard.component';

import { FlyerService } from '../services/flyer.service';
import { UserService } from '../services/user.service';

import { routing } from '../routing/app.routing';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		HttpModule
	],
	declarations: [
		AppComponent,
		FlyerDetailComponent,
		FlyersComponent,
		DashboardComponent
	],
	providers: [
		FlyerService,
		XHRBackend,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
