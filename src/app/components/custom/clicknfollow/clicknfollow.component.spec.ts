import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicknfollowComponent } from './clicknfollow.component';

describe('ClicknfollowComponent', () => {
  let component: ClicknfollowComponent;
  let fixture: ComponentFixture<ClicknfollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClicknfollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClicknfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
