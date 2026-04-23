import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDetailsForm } from './delivery-details-form';

describe('DeliveryDetailsForm', () => {
  let component: DeliveryDetailsForm;
  let fixture: ComponentFixture<DeliveryDetailsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryDetailsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryDetailsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
