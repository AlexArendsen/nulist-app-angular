import { Injectable } from '@angular/core';

import { BehaviorSubject, merge as ObservableMerge } from 'rxjs';

import { ItemService } from './item.service';
import { ItemVM } from '../models/item.model';
import { map, filter, mergeMap } from 'rxjs/operators';
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

    const movedTo = this.itemService.moved.pipe(
      filter(item => !!item && !!item.parent_id),
      mergeMap(item => this.itemService.get(item.parent_id))
    );

    ObservableMerge(
      movedTo,
      this.itemService.moved,
      this.itemService.updated,
      this.itemService.creating
    ).pipe(
      filter(item => !!item)
    ).subscribe(item => this.push(item));


  }

  private push(item: ItemVM) {
    this._recent = [item, ...this._recent.filter(i => i._id !== item._id).slice(0, this.BUFFER_SIZE - 1)];
    this.recent.next(this._recent);
  }

}
