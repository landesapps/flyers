import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flyer } from '../flyer';
import { FlyerService } from '../services/flyer.service';

@Component({
	selector: 'my-flyer-detail',
	templateUrl: 'app/templates/flyer-detail.component.html',
	styleUrls: ['app/styles/flyer-detail.component.css']
})

export class FlyerDetailComponent implements OnInit {
        @Input()
        flyer: Flyer;

        @Output()
        close = new EventEmitter();
        error: any;
        navigated = false; // true if navigated here

        constructor(private flyerService: FlyerService, private route: ActivatedRoute) { }

        ngOnInit() {
		this.route.params.forEach((params: Params) => {
			if (params['id'] !== undefined) {
				let id = +params['id'];
				this.navigated = true;
				this.flyerService.getFlyer(id).then(flyer => this.flyer = flyer);
			} else {
				this.navigated = false;
				this.flyer = new Flyer();
			}
		});
        }

        save(isGoBack: boolean = true): void {
		this.flyerService
			.save(this.flyer)
			.then(flyer => {
				this.flyer = flyer;
				
				if (isGoBack) {
					this.goBack(flyer);
				} else {
					this.refresh(flyer);
				}
			})
			.catch(error => this.error = error);
        }

        goBack(savedFlyer: Flyer = null): void {
		this.close.emit(savedFlyer);

		if (this.navigated) {
			window.history.back();
		}
        }

        refresh(savedFlyer: Flyer = null): void {
		this.close.emit(savedFlyer);
		window.location.reload();
        }
	
	uploadPhoto(event): void {
		let file: any = event.srcElement[0].files[0];
		let me = this;
		let callback: any = function() { me.save(false); };
		
		this.flyerService
			.uploadPhoto(this.flyer, file, callback)
			.toPromise()
			.catch(error => this.error = error);
	}
}
