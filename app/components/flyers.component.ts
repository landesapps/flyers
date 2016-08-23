import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Flyer } from '../flyer';
import { FlyerService } from '../services/flyer.service';
@Component({
	selector: 'my-flyers',
	styleUrls: ['app/styles/flyers.component.css'],
	templateUrl: 'app/templates/flyers.component.html'
})
export class FlyersComponent implements OnInit {
	selectedFlyer: Flyer;
	flyers: Flyer[];
	addingFlyer: boolean;
	error: any;

	constructor(private router: Router, private flyerService: FlyerService) { }

	onSelect(flyer: Flyer) {
		this.selectedFlyer = flyer;
		this.router.navigate(['/detail', this.selectedFlyer.id]);
	}

	getFlyers() {
		this.flyerService.getFlyers().then(heroes => this.flyers = heroes);
	}

	ngOnInit() {
		this.getFlyers();
	}

	addFlyer(): void {
		this.addingFlyer = true;
		this.selectedFlyer = null;
	}

	deleteFlyer(flyer: Flyer, event: any): void {
		event.stopPropagation();
		this.flyerService
			.delete(flyer)
			.then(res => {
				this.flyers = this.flyers.filter(possibleFlyer => possibleFlyer !== flyer);
				if (this.selectedFlyer === flyer) {
					this.selectedFlyer = null;
				}
			})
			.catch(error => this.error = error);
	}

	close(savedFlyer: Flyer): void {
		this.addingFlyer = false;

		if (savedFlyer) {
			this.getFlyers();
		}
	}
}
