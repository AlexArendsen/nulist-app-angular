import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { merge as ObservableMerge } from 'rxjs';
import { finalize, filter } from 'rxjs/operators';

import { ItemService } from '../../services/item.service';
import { ItemVM } from '../../models/item.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnChanges {

  @Input() itemId: string;
  item: ItemVM;
  saving = false;
  editingDescription = false;

  constructor(
    private items: ItemService,
    private navigate: NavigationService
  ) { }

  ngOnInit() {
    this.load();
    ObservableMerge(this.items.checked, this.items.unchecked, this.items.created).pipe(
      filter(i => i.parent_id == this.item._id)
    ).subscribe(i => this.load());
  }

  load() { this.items.get(this.itemId)
    .subscribe(model => { this.item = new ItemVM(model); this.saving = model.saving; }); }

  ngOnChanges(changes: SimpleChanges) { this.load(); }

  goUp() {
    this.navigate.up();
  }

  save() {
    this.saving = true;
    this.items.update(this.item).pipe(
      finalize(() => this.saving = false)
    ).subscribe(item => {});
  }

}
