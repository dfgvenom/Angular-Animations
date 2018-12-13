import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragnfollowComponent } from './dragnfollow.component';

describe('DragnfollowComponent', () => {
  let component: DragnfollowComponent;
  let fixture: ComponentFixture<DragnfollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragnfollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragnfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
