import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PandaproxyService } from './pandaproxy.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { StorefrontpageComponent } from './storefrontpage/storefrontpage.component';
import { ShoepageComponent } from './shoepage/shoepage.component';
import { MatCardModule } from '@angular/material/card';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            WelcomepageComponent,
            StorefrontpageComponent,
            ShoepageComponent,
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            MatTableModule,
            MatSortModule,
            MatToolbarModule,
            MatIconModule,
            MatMenuModule,
            MatButtonModule,
            MatGridListModule,
            MatCardModule
        ],
        providers: [PandaproxyService, provideAnimationsAsync()],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map