import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of as ObservableOf, BehaviorSubject, Subject } from 'rxjs';

import { Item, ItemVM } from '../models/item.model';
import { UserService } from './user.service';
import { filter, map, tap, mergeMap } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // TODO -- this should definitely be private
  public items: ItemVM[] = [];
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private lastUsedToken: string;

  public created: Subject<ItemVM> = new Subject();
  public updated: Subject<ItemVM> = new Subject();
  public deleted: Subject<ItemVM> = new Subject();
  public checked: Subject<ItemVM> = new Subject();
  public unchecked: Subject<ItemVM> = new Subject();
  public moved: Subject<ItemVM> = new Subject();

  constructor(
    private http: HttpClient,
    private users: UserService,
    private error: ErrorService
  ) {
    this.users.token.subscribe(token => this.load(token));

    this.created.subscribe(i => {
      this.items.push(i);
      this.connectParentsWithChildren();
      this.calculateItemPercentages(true);
    });

    this.updated.pipe(
      map(i => ({updated: i, existing: this.items.find(t => t._id == i._id)}))
    ).subscribe(pair => { Object.assign(pair.existing, pair.updated); this.calculateItemPercentages(true)});

    this.deleted.subscribe(async deleted => {
      const index = this.items.findIndex(i => i._id == deleted._id);
      this.items.splice(index, 1);
      this.connectParentsWithChildren();
      this.calculateItemPercentages(true);
    });

    this.checked.subscribe(i => this.calculateItemPercentages(true));
    this.unchecked.subscribe(i => this.calculateItemPercentages(true));
    this.moved.subscribe(i => this.reload());
  }

  private reload() { this.load(this.lastUsedToken); }

  private load(token) {
    this.lastUsedToken = token;
    this.http.get<Item[]>('/items').subscribe(list => {
      this.items = list.map(i => new ItemVM(i));
      this.loading.next(false);
      this.connectParentsWithChildren();
      this.calculateItemPercentages(true);
    });
  }

  private connectParentsWithChildren() {
    // Pair children with their parents
    // TODO -- Do this with IxJS' GroupBy
    this.items.forEach(i => i.children = this.items.filter(t => t.parent_id == i._id));
  }

  private calculateItemPercentages(force = false) {
    const setPercentage = (i: ItemVM) => {
      if (i.percent >= 0 && !force) return i.percent;
      if (i.checked) return i.percent = 1;
      if (!i.children || !i.children.length) return i.percent = 0;

      // If none of these base cases are satisfied, then we take the composite completion
      return i.percent = (
        (i.children.map(setPercentage).reduce((sum, next) => sum + next))
        /(i.children.length)
      );
    }

    this.items.filter(i => !i.parent_id).forEach(setPercentage);
  }

  get(id: string): Observable<ItemVM> {
    return this.loading.pipe(
      filter(l => l == false), map(x => this.items.find(i => i._id == id))
    );
  }

  getChildren(id: string): Observable<Item[]> {
    return this.loading.pipe(
      filter(l => l == false),
      map(x => (!!id)
        ? this.items.filter(i => i.parent_id == id)
        : this.items.filter(i => !i.parent_id)
      ));
  }

  getAll(): Observable<ItemVM[]> { return ObservableOf(this.items); }

  create(model: Item): Observable<Item> {
    if (!model.title) {
      this.error.shout('Could not create item', 'Item title may not be empty');
      return ObservableOf(null);
    } else {
      return this.http.post<Item>('/item', model).pipe(
        tap(i => this.created.next(new ItemVM(i)))
      );
    }
  }

  update(model: Item): Observable<ItemVM> {
    return this.http.put<Item>('/item', {
      title: model.title, description: model.description, _id: model._id
    }).pipe(
      tap(i => this.updated.next(new ItemVM(i))),
      map(updated => Object.assign(<ItemVM>model, updated))
    );
  }

  check(id: string): Observable<Item> {
    return this.http.put<Item>(`/item/${id}/check`, {}).pipe(
      tap(i => this.checked.next(new ItemVM(i)))
    );
  }

  uncheck(id: string): Observable<Item> {
    return this.http.put<Item>(`/item/${id}/uncheck`, {}).pipe(
      tap(i => this.unchecked.next(new ItemVM(i)))
    );
  }

  delete(id: string): Observable<Item> {
    return this.http.delete<Item>(`/item/${id}`).pipe(
      tap(i => this.deleted.next(new ItemVM(i)))
    );
  }

  move(subject: Item, newParent: Item): Observable<Item> {
    return this.http.put<Item>('/item', { _id: subject._id, parent_id: newParent._id }).pipe(
      tap(item => this.moved.next(new ItemVM(item)))
    );
  }

}
