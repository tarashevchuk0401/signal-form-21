import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebaseTest } from './rebase-test';

describe('RebaseTest', () => {
  let component: RebaseTest;
  let fixture: ComponentFixture<RebaseTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebaseTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RebaseTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
