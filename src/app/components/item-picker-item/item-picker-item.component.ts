import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemVM } from '../../models/item.model';

@Component({
  selector: 'app-item-picker-item',
  templateUrl: './item-picker-item.component.html',
  styleUrls: ['./item-picker-item.component.css']
})
export class ItemPickerItemComponent implements OnInit {

  @Input() item: ItemVM;
  @Output() pick: EventEmitter<ItemVM> = new EventEmitter<ItemVM>();
  expanded = false;

  constructor() { }

  ngOnInit() {
  }

  select(item: ItemVM) { this.pick.emit(item); }

  toggleExpand() { this.expanded = !this.expanded; }

}
