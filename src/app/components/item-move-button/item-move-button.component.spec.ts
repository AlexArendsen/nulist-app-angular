import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMoveButtonComponent } from './item-move-button.component';

describe('ItemMoveButtonComponent', () => {
  let component: ItemMoveButtonComponent;
  let fixture: ComponentFixture<ItemMoveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMoveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
