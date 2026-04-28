import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFactoryPattern } from './abstract-factory-pattern';

describe('AbstractFactoryPattern', () => {
  let component: AbstractFactoryPattern;
  let fixture: ComponentFixture<AbstractFactoryPattern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractFactoryPattern],
    }).compileComponents();

    fixture = TestBed.createComponent(AbstractFactoryPattern);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
