import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePayementDialog } from './stripe-payement-dialog';

describe('StripePayementDialog', () => {
  let component: StripePayementDialog;
  let fixture: ComponentFixture<StripePayementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StripePayementDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(StripePayementDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
