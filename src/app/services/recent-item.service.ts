import { Injectable } from '@angular/core';

import { BehaviorSubject, merge as ObservableMerge } from 'rxjs';

import { ItemService } from './item.service';
import { ItemVM } from '../models/item.model';
import { map, filter } from 'rxjs/operators';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class RecentItemService {

  private BUFFER_SIZE = 20;
  
  private _recent: ItemVM[] = [];

  public recent: BehaviorSubject<ItemVM[]> = new BehaviorSubject([]);

  constructor(
    private itemService: ItemService,
    private navigationService: NavigationService
  ) {
    ObservableMerge(
      this.itemService.moved,
      this.itemService.updated,
      this.itemService.creating,
      this.itemService.checking,
      this.itemService.unchecking,
      this.navigationService.selectedItem
    ).pipe(
      filter(item => !!item)
    ).subscribe(item => this.push(item));
  }

  private push(item: ItemVM) {
    this._recent = [item, ...this._recent.slice(0, this.BUFFER_SIZE - 1)];
    this.recent.next(this._recent);
  }

}
