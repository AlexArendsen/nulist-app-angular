import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBreadcrumbsComponent } from './item-breadcrumbs.component';

describe('ItemBreadcrumbsComponent', () => {
  let component: ItemBreadcrumbsComponent;
  let fixture: ComponentFixture<ItemBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
