import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ItemVM, Item } from '../../models/item.model';
import { NavigationService } from '../../services/navigation.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-breadcrumbs',
  templateUrl: './item-breadcrumbs.component.html',
  styleUrls: ['./item-breadcrumbs.component.css']
})
export class ItemBreadcrumbsComponent implements OnInit, OnDestroy {

  ancestors: ItemVM[] = [];
  selected: ItemVM = null;

  subscriptions: Subscription = new Subscription();

  constructor(
    private items: ItemService,
    private navigate: NavigationService
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.navigate.selectedItem.subscribe(item => this.onItemSelected(item)));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onItemSelected(i: ItemVM) {
    this.selected = i;
    this.ancestors = [];

    const appendAncestors = (current) => {
      this.ancestors.push(current);
      if (!current.parent_id) return this.ancestors.reverse();
      this.items.get(current.parent_id).subscribe(parent => appendAncestors(parent));
    }

    if (i) appendAncestors(i);

  }

  toRoot() { this.navigate.toRoot(); }
  toItem(i: Item) { this.navigate.toItem(i._id); }

}
