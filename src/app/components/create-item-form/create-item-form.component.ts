import { Component, OnInit, Input } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-create-item-form',
  templateUrl: './create-item-form.component.html',
  styleUrls: ['./create-item-form.component.css']
})
export class CreateItemFormComponent implements OnInit {

  @Input() parentId: string;
  model: Item = new Item();
  creating = false;

  constructor(
    private items: ItemService
  ) { }

  ngOnInit() { }

  create() {
    this.creating = true;
    this.model.parent_id = this.parentId;
    this.items.create(this.model).pipe(
      finalize(() => this.creating = false)
    ).subscribe(x => this.model = new Item());
  }

}
