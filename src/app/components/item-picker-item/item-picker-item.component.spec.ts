import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPickerItemComponent } from './item-picker-item.component';

describe('ItemPickerItemComponent', () => {
  let component: ItemPickerItemComponent;
  let fixture: ComponentFixture<ItemPickerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPickerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPickerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
