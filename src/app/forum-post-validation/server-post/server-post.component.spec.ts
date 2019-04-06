import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPostComponent } from './server-post.component';

describe('ServerPostComponent', () => {
  let component: ServerPostComponent;
  let fixture: ComponentFixture<ServerPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
