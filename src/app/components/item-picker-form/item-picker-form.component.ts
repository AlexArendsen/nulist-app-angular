import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item, ItemVM } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { RecentItemService } from '../../services/recent-item.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-picker-form',
  templateUrl: './item-picker-form.component.html',
  styleUrls: ['./item-picker-form.component.css']
})
export class ItemPickerFormComponent implements OnInit {

  // TODO -- add support for rooted display
  //@Input() root: Item;

  @Output() pick: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() select: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  private allItems: ItemVM[];
  public topLevelItems: ItemVM[];
  public recentItems: ItemVM[];
  public selectedItem: Item;

  showSubmit: boolean;
  showCancel: boolean;

  constructor(
    private items: ItemService,
    private recentItemService: RecentItemService
  ) { }

  ngOnInit() {
    this.load();
    this.showSubmit = this.pick.observers.length > 0;
    this.showCancel = this.cancel.observers.length > 0;

    this.recentItemService.recent.pipe(
      map(list => list.slice(0, 7))
    ).subscribe(items => this.recentItems = items);
  }

  load() {
    this.items.getAll().subscribe(list => {
      this.allItems = list
      this.topLevelItems = this.allItems.filter(i => !i.parent_id);
    });

  }

  onSelect(item: Item) {
    this.selectedItem = item;
    this.select.emit(item);
  }

  onSubmit() {
    this.pick.emit(this.selectedItem);
  }

  onCancel() {
    this.cancel.emit(true);
  }

}
