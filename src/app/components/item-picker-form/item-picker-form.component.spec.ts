import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPickerFormComponent } from './item-picker-form.component';

describe('ItemPickerFormComponent', () => {
  let component: ItemPickerFormComponent;
  let fixture: ComponentFixture<ItemPickerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPickerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
