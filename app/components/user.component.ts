import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'my-users',
	templateUrl: 'app/templates/user.component.html',
	styleUrls: ['app/styles/dashboard.component.css']
})

export class UserComponent {
	users: User[] = [];

	constructor(private router: Router, private userService: UserService) { }

	ngOnInit() {
		this.userService.setCurrentUser(null);
		this.userService.getUsers().then(users => this.users = users);
	}

	setUser(user: User) {
		this.userService.setCurrentUser(user);
		let link = ['/dashboard'];
		this.router.navigate(link);
	}
}
