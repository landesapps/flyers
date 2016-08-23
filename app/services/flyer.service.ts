import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Rx';

import { Flyer } from '../flyer';

import { UserService } from '../services/user.service';

// Remove parentheses to see error
@Injectable()
export class FlyerService {
	private flyersUrl = 'https://blooming-tundra-58271.herokuapp.com';
	private progressObserver: any;
	private progress: any;

        constructor(private userService: UserService, private http: Http) { 
		this.progress = Observable.create(observer => { this.progressObserver = observer }).share();
	}

        getFlyers(): Promise<Flyer[]> {
		let userId: number = this.userService.getCurrentUser().id;
		return this.http.get(this.flyersUrl + "/user/" + userId + "/flyers") // Temporarily set the user
			.toPromise()
			.then(response => response.json().flyers as Flyer[])
			.catch(this.handleError);
        }

        getFlyer(id: number) {
		return this.http.get(this.flyersUrl + "/flyers/" + id)
			.toPromise()
			.then(response => response.json() as Flyer)
			.catch(this.handleError);
        }

        private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
        }

        private post(flyer: Flyer): Promise<Flyer> {
		let headers = new Headers({
			'Content-Type': 'application/json',
		});

		return this.http
			.post(this.flyersUrl + '/flyers', flyer, { headers: headers })
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
        }

        private put(flyer: Flyer): Promise<Flyer> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let url = `${this.flyersUrl}/flyers/${flyer.id}`;

		return this.http
			.put(url, JSON.stringify(flyer), { headers: headers })
			.toPromise()
			.then(() => flyer)
			.catch(this.handleError);
        }

        delete(flyer: Flyer): Promise<Response> {
		let url = `${this.flyersUrl}/flyers/${flyer.id}`;

		return this.http
			.delete(url)
			.toPromise()
			.catch(this.handleError);
        }

        save(flyer: Flyer): Promise<Flyer> {
		flyer.userId = this.userService.getCurrentUser().id;
		let error = this.verify(flyer);

		if (error !== null) {
			return this.handleError(error);
		}

		flyer.price = flyer.price.replace(/[^0-9\.]+/g, "");

		if (flyer.id) {
			return this.put(flyer);
		}

		return this.post(flyer);
        }

	uploadPhoto(flyer: Flyer, photo: any): Observable {
		let url = `${this.flyersUrl}/${flyer.id}/photos`;
		
		return this.makeFileRequest(url, flyer.user_id, photo)
//			.toPromise()
//			.then(flyer => flyer)
			.catch(this.handleError);
	}

	private makeFileRequest(url: string, userId: string, file: any): Observable {
		
		return Observable.create(observer => {
			let formData: FormData = new FormData(),
				xhr: XMLHttpRequest = new XMLHttpRequest();

			formData.append("user_id", userId);
			formData.append("photo", file);
			
			xhr.addEventListener("readystatechange", function() {
				if (this.readyState === 4) {
					console.log(this.responseText);
				}
			});

			xhr.open('POST', url, true);
			xhr.send(formData);
		});
	}

	private verify(flyer: Flyer) {
		let error: string[] = [];
		if (flyer.userId === null || typeof flyer.userId === "undefined") {
			error[error.length] = "User ID is required";
		}
		if (flyer.street === null || flyer.street === "" || typeof flyer.street === "undefined") {
			error[error.length] = "Street is required";
		}
		if (flyer.city === null || flyer.city === "" || typeof flyer.city === "undefined") {
			error[error.length] = "City is required";
		}
		if (flyer.zip === null || flyer.zip === "" || typeof flyer.zip === "undefined") {
			error[error.length] = "Zip is required";
		}
		if (flyer.country === null || flyer.country === "" || typeof flyer.country === "undefined") {
			error[error.length] = "Country is required";
		}
		if (flyer.state === null || flyer.state === "" || typeof flyer.state === "undefined") {
			error[error.length] = "State is required";
		}
		if (flyer.price === null || flyer.price === "" || typeof flyer.price === "undefined") {
			error[error.length] = "Price is required";
		}
		if (flyer.description === null || flyer.description === "" || typeof flyer.description === "undefined") {
			error[error.length] = "Description is required";
		}

		if (error.length > 0) {
			return error.join() + " is required";
		}
		return null;
	}
}
