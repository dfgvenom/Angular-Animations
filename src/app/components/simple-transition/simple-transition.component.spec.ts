import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTransitionComponent } from './simple-transition.component';

describe('SimpleTransitionComponent', () => {
  let component: SimpleTransitionComponent;
  let fixture: ComponentFixture<SimpleTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
