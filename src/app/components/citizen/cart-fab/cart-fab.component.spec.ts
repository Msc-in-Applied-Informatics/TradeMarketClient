import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFabComponent } from './cart-fab.component';

describe('CartFabComponent', () => {
  let component: CartFabComponent;
  let fixture: ComponentFixture<CartFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartFabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
