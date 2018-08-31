import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteButtonComponent } from './item-delete-button.component';

describe('ItemDeleteButtonComponent', () => {
  let component: ItemDeleteButtonComponent;
  let fixture: ComponentFixture<ItemDeleteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDeleteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
