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
var flyer_1 = require('../flyer');
var flyer_service_1 = require('../services/flyer.service');
var FlyerDetailComponent = (function () {
    function FlyerDetailComponent(flyerService, route) {
        this.flyerService = flyerService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    FlyerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                var id = +params['id'];
                _this.navigated = true;
                _this.flyerService.getFlyer(id).then(function (flyer) { return _this.flyer = flyer; });
            }
            else {
                _this.navigated = false;
                _this.flyer = new flyer_1.Flyer();
            }
        });
    };
    FlyerDetailComponent.prototype.save = function () {
        var _this = this;
        this.flyerService
            .save(this.flyer)
            .then(function (flyer) {
            _this.flyer = flyer;
            _this.goBack(flyer);
        })
            .catch(function (error) { return _this.error = error; });
    };
    FlyerDetailComponent.prototype.goBack = function (savedFlyer) {
        if (savedFlyer === void 0) { savedFlyer = null; }
        this.close.emit(savedFlyer);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', flyer_1.Flyer)
    ], FlyerDetailComponent.prototype, "flyer", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlyerDetailComponent.prototype, "close", void 0);
    FlyerDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-flyer-detail',
            templateUrl: 'app/templates/flyer-detail.component.html',
            styleUrls: ['app/styles/flyer-detail.component.css']
        }), 
        __metadata('design:paramtypes', [flyer_service_1.FlyerService, router_1.ActivatedRoute])
    ], FlyerDetailComponent);
    return FlyerDetailComponent;
}());
exports.FlyerDetailComponent = FlyerDetailComponent;
//# sourceMappingURL=flyer-detail.component.js.map