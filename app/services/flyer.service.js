"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var user_service_1 = require('../services/user.service');
// Remove parentheses to see error
var FlyerService = (function () {
    function FlyerService(userService, http) {
        this.userService = userService;
        this.http = http;
        this.flyersUrl = 'https://blooming-tundra-58271.herokuapp.com';
    }
    FlyerService.prototype.getFlyers = function () {
        var userId = this.userService.getCurrentUser().id;
        this.userService.getUsers();
        console.log(localStorage.getItem('user'));
        return this.http.get(this.flyersUrl + "/user/" + userId + "/flyers") // Temporarily set the user
            .toPromise()
            .then(function (response) { return response.json().flyers; })
            .catch(this.handleError);
    };
    FlyerService.prototype.getFlyer = function (id) {
        return this.getFlyers().then(function (flyers) { return flyers.find(function (flyer) { return flyer.id === id; }); });
    };
    FlyerService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    FlyerService.prototype.post = function (flyer) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
        return this.http
            .post(this.flyersUrl + '/flyers', flyer, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    FlyerService.prototype.put = function (flyer) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var url = this.flyersUrl + "/flyers/" + flyer.id;
        return this.http
            .put(url, JSON.stringify(flyer), { headers: headers })
            .toPromise()
            .then(function () { return flyer; })
            .catch(this.handleError);
    };
    FlyerService.prototype.delete = function (flyer) {
        var url = this.flyersUrl + "/flyers/" + flyer.id;
        return this.http
            .delete(url)
            .toPromise()
            .catch(this.handleError);
    };
    FlyerService.prototype.save = function (flyer) {
        // Verify the flyer's information
        flyer.userId = this.userService.getCurrentUser().id;
        var error = this.verify(flyer);
        if (error !== null) {
            return this.handleError(error);
        }
        flyer.price = flyer.price.replace(/[^0-9\.]+/g, "");
        if (flyer.id) {
            return this.put(flyer);
        }
        return this.post(flyer);
    };
    FlyerService.prototype.verify = function (flyer) {
        var error = [];
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
    };
    FlyerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, http_1.Http])
    ], FlyerService);
    return FlyerService;
}());
exports.FlyerService = FlyerService;
//# sourceMappingURL=flyer.service.js.map