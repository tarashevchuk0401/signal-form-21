import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Memento } from './memento';

describe('Memento', () => {
  let component: Memento;
  let fixture: ComponentFixture<Memento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Memento],
    }).compileComponents();

    fixture = TestBed.createComponent(Memento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
