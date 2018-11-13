import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalyticsViewComponent } from './admin-analytics-view.component';

describe('AdminAnalyticsViewComponent', () => {
  let component: AdminAnalyticsViewComponent;
  let fixture: ComponentFixture<AdminAnalyticsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnalyticsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalyticsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
