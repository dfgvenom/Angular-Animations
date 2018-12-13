import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedTransitionComponent } from './extended-transition.component';

describe('ExtendedTransitionComponent', () => {
  let component: ExtendedTransitionComponent;
  let fixture: ComponentFixture<ExtendedTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
