import { TestBed } from '@angular/core/testing';
import { StorefrontpageComponent } from './storefrontpage.component';
describe('StorefrontpageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StorefrontpageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(StorefrontpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=storefrontpage.component.spec.js.map