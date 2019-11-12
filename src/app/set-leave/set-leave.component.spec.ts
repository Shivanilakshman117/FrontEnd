import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLeaveComponent } from './set-leave.component';

describe('SetLeaveComponent', () => {
  let component: SetLeaveComponent;
  let fixture: ComponentFixture<SetLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
