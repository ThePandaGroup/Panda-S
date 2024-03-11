import { TestBed } from '@angular/core/testing';
import { ShoepageComponent } from './shoepage.component';
describe('ShoepageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShoepageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ShoepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=shoepage.component.spec.js.map