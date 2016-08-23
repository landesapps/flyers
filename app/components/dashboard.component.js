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
var router_1 = require('@angular/router');
var flyer_service_1 = require('../services/flyer.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, flyerService) {
        this.router = router;
        this.flyerService = flyerService;
        this.flyers = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.flyerService.getFlyers().then(function (flyers) { return _this.flyers = flyers.sort(function (a, b) {
            return Number(b.price.replace(/[^0-9\.]+/g, "")) - Number(a.price.replace(/[^0-9\.]+/g, ""));
        }).splice(0, 4); });
    };
    DashboardComponent.prototype.gotoDetail = function (flyer) {
        var link = ['/detail', flyer.id];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/templates/dashboard.component.html',
            styleUrls: ['app/styles/dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, flyer_service_1.FlyerService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map