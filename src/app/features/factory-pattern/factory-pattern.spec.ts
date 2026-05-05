import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryPattern } from './factory-pattern';

describe('FactoryPattern', () => {
  let component: FactoryPattern;
  let fixture: ComponentFixture<FactoryPattern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactoryPattern],
    }).compileComponents();

    fixture = TestBed.createComponent(FactoryPattern);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
