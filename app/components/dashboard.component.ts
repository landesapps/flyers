import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Flyer } from '../flyer';
import { FlyerService } from '../services/flyer.service';

@Component({
	selector: 'my-dashboard',
	templateUrl: 'app/templates/dashboard.component.html',
	styleUrls: ['app/styles/dashboard.component.css']
})

export class DashboardComponent {
	flyers: Flyer[] = [];

	constructor(private router: Router, private flyerService: FlyerService) { }

	ngOnInit() {
		this.flyerService.getFlyers().then(flyers => this.flyers = flyers.sort(function(a, b) {
			return Number(b.price.replace(/[^0-9\.]+/g, "")) - Number(a.price.replace(/[^0-9\.]+/g, ""));
		}).splice(0, 4));
	}

	gotoDetail(flyer: Flyer) {
		let link = ['/detail', flyer.id];
		this.router.navigate(link);
	}
}
