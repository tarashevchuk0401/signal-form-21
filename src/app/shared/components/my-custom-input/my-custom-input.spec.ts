import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomInput } from './my-custom-input';

describe('MyCustomInput', () => {
  let component: MyCustomInput;
  let fixture: ComponentFixture<MyCustomInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCustomInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCustomInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
