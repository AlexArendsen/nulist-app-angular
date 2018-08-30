import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProgressBarComponent } from './item-progress-bar.component';

describe('ItemProgressBarComponent', () => {
  let component: ItemProgressBarComponent;
  let fixture: ComponentFixture<ItemProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
