import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

import { finalize, filter } from 'rxjs/operators';

import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-create-item-form',
  templateUrl: './create-item-form.component.html',
  styleUrls: ['./create-item-form.component.css']
})
export class CreateItemFormComponent implements OnInit, OnChanges {

  @Input() parentId: string;
  model: Item = new Item();
  creating = false;
  placeholderText = 'Create new item';

  constructor(
    private items: ItemService
  ) { }

  ngOnInit() { this.setPlaceholderText(); }
  ngOnChanges(changes: SimpleChanges) { this.setPlaceholderText(); }

  setPlaceholderText() {
    this.items.get(this.parentId).pipe(
      filter(parent => !!parent && !!parent.title)
    ).subscribe(parent => this.placeholderText = `Create new item under "${parent.title}"`);
  }

  create() {
    this.model.parent_id = this.parentId;
    this.items.create(this.model).subscribe();
    this.model = new Item();

    if (typeof(window) !== typeof(undefined))
      window.document.getElementById('create-item-input-field').focus();
  }

}
