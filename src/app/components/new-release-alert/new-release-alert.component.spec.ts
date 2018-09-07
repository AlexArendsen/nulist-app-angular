import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleaseAlertComponent } from './new-release-alert.component';

describe('NewReleaseAlertComponent', () => {
  let component: NewReleaseAlertComponent;
  let fixture: ComponentFixture<NewReleaseAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReleaseAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReleaseAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
