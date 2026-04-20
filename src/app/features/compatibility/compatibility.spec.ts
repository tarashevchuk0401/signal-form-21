import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compatibility } from './compatibility';

describe('Compatibility', () => {
  let component: Compatibility;
  let fixture: ComponentFixture<Compatibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compatibility],
    }).compileComponents();

    fixture = TestBed.createComponent(Compatibility);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
