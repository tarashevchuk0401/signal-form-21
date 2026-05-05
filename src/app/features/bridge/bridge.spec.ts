import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bridge } from './bridge';

describe('Bridge', () => {
  let component: Bridge;
  let fixture: ComponentFixture<Bridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bridge],
    }).compileComponents();

    fixture = TestBed.createComponent(Bridge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
