import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';

import { ItemService } from '../../services/item.service';
import { ItemVM } from '../../models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnChanges {

  @Input() itemId: string;
  item: ItemVM;
  saving = false;

  constructor(
    private items: ItemService,
    private router: Router
  ) { }

  ngOnInit() { this.load(); }

  load() { this.items.get(this.itemId)
    .subscribe(model => this.item = new ItemVM(model)); }

  ngOnChanges(changes: SimpleChanges) { this.load(); }

  goUp() {
    if (!this.item.parent_id) { this.router.navigateByUrl('/items'); }
    else { this.router.navigate(['/item', this.item.parent_id]); }
  }

  save() {
    this.saving = true;
    this.items.update(this.item).pipe(
      finalize(() => this.saving = false)
    ).subscribe(item => this.item = item);
  }

}
