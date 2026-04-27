import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalPayementDialog } from './paypal-payement-dialog';

describe('PaypalPayementDialog', () => {
  let component: PaypalPayementDialog;
  let fixture: ComponentFixture<PaypalPayementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypalPayementDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PaypalPayementDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
