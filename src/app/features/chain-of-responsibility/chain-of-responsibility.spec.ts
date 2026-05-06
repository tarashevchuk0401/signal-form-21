import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainOfResponsibility } from './chain-of-responsibility';

describe('ChainOfResponsibility', () => {
  let component: ChainOfResponsibility;
  let fixture: ComponentFixture<ChainOfResponsibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainOfResponsibility],
    }).compileComponents();

    fixture = TestBed.createComponent(ChainOfResponsibility);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
