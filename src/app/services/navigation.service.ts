import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ItemVM } from '../models/item.model';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public selectedItem: BehaviorSubject<ItemVM> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private items: ItemService
  ) { }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toOutline() {
    this.router.navigate(['/outline']);
  }

  toItem(id: string) {
    if (!id) { this.toRoot(); }
    else {
      this.items.get(id).subscribe(item => this.selectedItem.next(item));
      this.router.navigate(['/item', id]);
    }
  }

  up() {
    const item = this.selectedItem.value;
    if (item && item.parent_id) this.toItem(item.parent_id);
    else this.toRoot();
  }

  toRoot() {
    this.selectedItem.next(null);
    this.router.navigate(['/items']);
  }

}
