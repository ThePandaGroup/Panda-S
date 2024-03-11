import { __decorate } from "tslib";
import { Component } from '@angular/core';
let StorefrontpageComponent = class StorefrontpageComponent {
    constructor(route, pandaProxyService, router) {
        this.route = route;
        this.pandaProxyService = pandaProxyService;
        this.router = router;
        this.shoes = [];
    }
    ngOnInit() {
        const storeId = Number(this.route.snapshot.paramMap.get('storefrontId'));
        if (storeId) {
            this.pandaProxyService.getAStorefront(storeId).subscribe(storefront => {
                this.storefront = storefront;
                this.fetchShoes(storefront.invList);
            });
        }
    }
    fetchShoes(invList) {
        invList.forEach(shoeId => {
            this.pandaProxyService.getAShoe(Number(shoeId)).subscribe(shoe => {
                this.shoes.push(shoe);
            });
        });
    }
};
StorefrontpageComponent = __decorate([
    Component({
        selector: 'app-storefrontpage',
        templateUrl: './storefrontpage.component.html',
        styleUrl: './storefrontpage.component.css'
    })
], StorefrontpageComponent);
export { StorefrontpageComponent };
//# sourceMappingURL=storefrontpage.component.js.map