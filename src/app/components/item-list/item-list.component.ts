import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { filter } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnChanges {

  @Input() parentId: string;
  children: Item[];
  loading = true;

  constructor(
    private items: ItemService,
    private navigate: NavigationService
  ) { }

  ngOnInit() {
    this.items.created.pipe(
      filter(i => i.parent_id == this.parentId)
    ).subscribe(i => this.children.push(i));

    this.items.loading.subscribe(l => this.loading = l);

    this.load();
  }

  load() { this.items.getChildren(this.parentId).subscribe(list => this.children = list); }

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  saveCheck(child: Item) {
    const obs = (child.checked)
      ? this.items.uncheck(child._id)
      : this.items.check(child._id);
    obs.subscribe(x => {});
  }

  gotoItem(child: Item) {
    this.navigate.toItem(child._id);
  }

}
