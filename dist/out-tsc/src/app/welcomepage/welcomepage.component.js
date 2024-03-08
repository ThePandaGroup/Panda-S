import { __decorate } from "tslib";
import { Component } from '@angular/core';
let WelcomepageComponent = class WelcomepageComponent {
    constructor(route, pandaProxyService, router) {
        this.route = route;
        this.pandaProxyService = pandaProxyService;
        this.router = router;
        this.shoes = [];
    }
    ngOnInit() {
        this.pandaProxyService.getAllShoes().subscribe(shoes => this.shoes = shoes);
    }
};
WelcomepageComponent = __decorate([
    Component({
        selector: 'app-welcomepage',
        templateUrl: './welcomepage.component.html',
        styleUrl: './welcomepage.component.css'
    })
], WelcomepageComponent);
export { WelcomepageComponent };
//# sourceMappingURL=welcomepage.component.js.map