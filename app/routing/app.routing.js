"use strict";
var router_1 = require('@angular/router');
var flyers_component_1 = require('../components/flyers.component');
var dashboard_component_1 = require('../components/dashboard.component');
var flyer_detail_component_1 = require('../components/flyer-detail.component');
var appRoutes = [
    {
        path: 'flyers',
        component: flyers_component_1.FlyersComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'detail/:id',
        component: flyer_detail_component_1.FlyerDetailComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map