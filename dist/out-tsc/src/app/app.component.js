import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(route, pandaProxyService, router) {
        this.route = route;
        this.pandaProxyService = pandaProxyService;
        this.router = router;
        this.title = 'panda-s';
        this.isLoggedIn = false;
        this.cart = [];
    }
    ngOnInit() {
        this.pandaProxyService.getABuyer(1111).subscribe(buyer => {
            this.buyer = buyer;
            this.fetchCartItems(buyer.cart);
        });
    }
    // ngOnInit() {
    //   this.pandaProxyService.getLoggedInUser().subscribe(user => {
    //     if (user) {
    //       this.isLoggedIn = true;
    //       this.buyer = user;
    //       this.fetchCartItems((user as any).cart);
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   });
    // }
    fetchCartItems(cart) {
        cart.forEach((cartItem) => {
            this.pandaProxyService.getAShoe(Number(cartItem.shoeID)).subscribe(shoe => {
                this.cart.push(shoe);
            });
        });
    }
    removeFromCart(shoeId) {
        return;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrl: './app.component.css'
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map