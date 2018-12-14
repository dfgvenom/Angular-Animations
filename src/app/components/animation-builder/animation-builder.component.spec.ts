import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationBuilderComponent } from './animation-builder.component';

describe('AnimationBuilderComponent', () => {
  let component: AnimationBuilderComponent;
  let fixture: ComponentFixture<AnimationBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
