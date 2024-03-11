import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PandaproxyService = class PandaproxyService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.hostUrl = 'https://panda-s.azurewebsites.net/';
    }
    getAllShoes() {
        console.log('getting all shoes');
        return this.httpClient.get(this.hostUrl + 'app/shoes/');
    }
    getAShoe(id) {
        return this.httpClient.get(this.hostUrl + 'app/shoes/' + id);
    }
    getASeller(id) {
        return this.httpClient.get(this.hostUrl + 'app/sellers/' + id);
    }
    getAStorefront(id) {
        return this.httpClient.get(this.hostUrl + 'app/storefronts/' + id);
    }
    getABuyer(id) {
        return this.httpClient.get(this.hostUrl + 'app/buyers/' + id);
    }
    updateCart(buyerId, shoeId) {
        return this.httpClient.post(this.hostUrl + 'app/buyers/' + buyerId + '/cart/' + shoeId, {});
    }
    updateCartRemoval(buyerId, shoeId) {
        return this.httpClient.delete(this.hostUrl + 'app/buyers/' + buyerId + '/cart/' + shoeId, {});
    }
    getLoggedInUser() {
        return this.httpClient.get('/api/user');
    }
};
PandaproxyService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PandaproxyService);
export { PandaproxyService };
//# sourceMappingURL=pandaproxy.service.js.map