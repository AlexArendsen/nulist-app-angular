import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ItemVM } from '../models/item.model';
import { ItemService } from './item.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public selectedItem: BehaviorSubject<ItemVM> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private items: ItemService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      let tokens = this.router.url.match(/\/item\/([0-9a-z]+)/);
      const itemid = tokens ? tokens[1] : '';
      this.items.get(itemid).subscribe(item => this.selectedItem.next(item));
    });

  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toOutline() {
    this.router.navigate(['/outline']);
  }

  toItem(id: string) {
    if (!id) { this.toRoot(); }
    else {
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
