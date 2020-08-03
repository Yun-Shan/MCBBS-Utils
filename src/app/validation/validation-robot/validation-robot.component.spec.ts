import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRobotComponent } from './validation-robot.component';

describe('ValidationRobotComponent', () => {
  let component: ValidationRobotComponent;
  let fixture: ComponentFixture<ValidationRobotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationRobotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
