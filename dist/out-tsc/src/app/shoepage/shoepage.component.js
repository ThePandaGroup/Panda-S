import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ShoepageComponent = class ShoepageComponent {
    constructor(route, pandaProxyService, router) {
        this.route = route;
        this.pandaProxyService = pandaProxyService;
        this.router = router;
    }
    ngOnInit() {
        const shoeId = Number(this.route.snapshot.paramMap.get('shoeId'));
        if (shoeId) {
            this.pandaProxyService.getAShoe(shoeId).subscribe(shoe => {
                this.shoe = shoe;
                if (this.shoe.storeId) {
                    this.pandaProxyService.getAStorefront(this.shoe.storeId).subscribe(storefront => {
                        this.storefront = storefront;
                        if (this.storefront && this.storefront.sellerId) {
                            this.pandaProxyService.getASeller(this.storefront.sellerId).subscribe(seller => {
                                this.seller = seller;
                            });
                        }
                    });
                }
            });
        }
    }
    addToCart(shoeId) {
        this.pandaProxyService.updateCart(1111, shoeId).subscribe(() => {
            window.location.reload();
        });
    }
};
ShoepageComponent = __decorate([
    Component({
        selector: 'app-shoepage',
        templateUrl: './shoepage.component.html',
        styleUrl: './shoepage.component.css'
    })
], ShoepageComponent);
export { ShoepageComponent };
//# sourceMappingURL=shoepage.component.js.map