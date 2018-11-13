import { Component, OnInit, Input } from '@angular/core';

import { ItemVM } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-item-list-entry',
  templateUrl: './item-list-entry.component.html',
  styleUrls: ['./item-list-entry.component.css']
})
export class ItemListEntryComponent implements OnInit {

  @Input() public item: ItemVM;

  constructor(
    private itemService: ItemService,
    private navigate: NavigationService
  ) { }

  ngOnInit() {
  }

  saveCheck() {
    const obs = (this.item.checked)
      ? this.itemService.uncheck(this.item._id)
      : this.itemService.check(this.item._id);
    obs.subscribe(x => {});
  }

  gotoItem() {
    if (this.item._id) this.navigate.toItem(this.item._id);
  }


}
