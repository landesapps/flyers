import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../user';

// Remove parentheses to see error
@Injectable()
export class UserService {
	private usersUrl = 'https://blooming-tundra-58271.herokuapp.com/user';

        constructor(private http: Http) { }

        getUsers(): Promise<User[]> {
		return this.http.get(this.usersUrl)
			.toPromise()
			.then(response => response.json() as User[])
			.catch(this.handleError);
        }

        getUser(id: number) {
		return this.getUsers().then(users => users.find(user => user.id === id));
        }

        private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
        }
}
