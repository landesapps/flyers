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
var FlyersComponent = (function () {
    function FlyersComponent(router, flyerService) {
        this.router = router;
        this.flyerService = flyerService;
    }
    FlyersComponent.prototype.onSelect = function (flyer) {
        this.selectedFlyer = flyer;
        this.router.navigate(['/detail', this.selectedFlyer.id]);
    };
    FlyersComponent.prototype.getFlyers = function () {
        var _this = this;
        this.flyerService.getFlyers().then(function (heroes) { return _this.flyers = heroes; });
    };
    FlyersComponent.prototype.ngOnInit = function () {
        this.getFlyers();
    };
    FlyersComponent.prototype.addFlyer = function () {
        this.addingFlyer = true;
        this.selectedFlyer = null;
    };
    FlyersComponent.prototype.deleteFlyer = function (flyer, event) {
        var _this = this;
        event.stopPropagation();
        this.flyerService
            .delete(flyer)
            .then(function (res) {
            _this.flyers = _this.flyers.filter(function (possibleFlyer) { return possibleFlyer !== flyer; });
            if (_this.selectedFlyer === flyer) {
                _this.selectedFlyer = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    FlyersComponent.prototype.close = function (savedFlyer) {
        this.addingFlyer = false;
        if (savedFlyer) {
            this.getFlyers();
        }
    };
    FlyersComponent = __decorate([
        core_1.Component({
            selector: 'my-flyers',
            styleUrls: ['app/styles/flyers.component.css'],
            templateUrl: 'app/templates/flyers.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, flyer_service_1.FlyerService])
    ], FlyersComponent);
    return FlyersComponent;
}());
exports.FlyersComponent = FlyersComponent;
//# sourceMappingURL=flyers.component.js.map