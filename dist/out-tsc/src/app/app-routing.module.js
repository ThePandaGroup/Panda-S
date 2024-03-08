import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ShoepageComponent } from './shoepage/shoepage.component';
import { StorefrontpageComponent } from './storefrontpage/storefrontpage.component';
const routes = [
    { path: '', component: WelcomepageComponent },
    { path: 'storefront/:storefrontId', component: StorefrontpageComponent },
    { path: 'storefront/shoe/:shoeId', component: ShoepageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, { useHash: true })],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map