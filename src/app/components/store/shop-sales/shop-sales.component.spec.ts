import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSalesComponent } from './shop-sales.component';

describe('ShopSalesComponent', () => {
  let component: ShopSalesComponent;
  let fixture: ComponentFixture<ShopSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
