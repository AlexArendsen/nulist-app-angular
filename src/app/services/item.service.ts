import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of as ObservableOf, merge as ObservableMerge, BehaviorSubject, Subject } from 'rxjs';

import { Item, ItemVM } from '../models/item.model';
import { UserService } from './user.service';
import { filter, map, tap, mergeMap, finalize } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // TODO -- this should definitely be private
  public items: ItemVM[] = [];
  public loading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private lastUsedToken: string;

  public creating: Subject<ItemVM> = new Subject();
  public created: Subject<ItemVM> = new Subject();

  public updating: Subject<ItemVM> = new Subject();
  public updated: Subject<ItemVM> = new Subject();

  public deleting: Subject<ItemVM> = new Subject();
  public deleted: Subject<ItemVM> = new Subject();

  public checking: Subject<ItemVM> = new Subject();
  public checked: Subject<ItemVM> = new Subject();

  public unchecking: Subject<ItemVM> = new Subject();
  public unchecked: Subject<ItemVM> = new Subject();

  public moved: Subject<ItemVM> = new Subject();

  constructor(
    private http: HttpClient,
    private users: UserService,
    private error: ErrorService
  ) {
    this.users.token.subscribe(token => this.load(token));

    this.created.subscribe(i => { });

    this.updated.pipe(
      map(i => ({updated: i, existing: this.items.find(t => t._id == i._id)}))
    ).subscribe(pair => { Object.assign(pair.existing, pair.updated); this.calculateItemDescendantsAndCompleted(true)});

    this.deleted.subscribe(async deleted => {
      const index = this.items.findIndex(i => i._id == deleted._id);
      this.items.splice(index, 1);
      this.connectParentsWithChildren();
      this.calculateItemDescendantsAndCompleted(true);
    });

    ObservableMerge(this.updating, this.checking, this.unchecking, this.deleting).subscribe(i => this.lockItem(i._id));
    ObservableMerge(this.updated,  this.checked,  this.unchecked, this.created).subscribe(i => this.unlockItem(i._id));

    this.checked.subscribe(i => this.calculateItemDescendantsAndCompleted(true));
    this.unchecked.subscribe(i => this.calculateItemDescendantsAndCompleted(true));

    this.moved.subscribe(i => this.reload());
  }

  private reload() { this.load(this.lastUsedToken); }

  private load(token) {
    this.lastUsedToken = token;
    this.http.get<Item[]>('/items').subscribe(list => {
      this.items = list.map(i => new ItemVM(i));
      this.loading.next(false);
      this.connectParentsWithChildren();
      this.calculateItemDescendantsAndCompleted(true);
    });
  }

  private connectParentsWithChildren() {
    // Pair children with their parents
    // TODO -- Do this with IxJS' GroupBy
    this.items.filter(i => !!i._id).forEach(i => i.children = this.items.filter(t => t.parent_id == i._id));
  }

  private calculateItemDescendantsAndCompleted(force = false) {

    const sum = (list: number[]) => list.reduce((sum, next) => sum + next, 0);

    const setDescendantsAndCompleted = (i: ItemVM) => {

      // If this item has already had its descendants calculated, then we can assume it's memoized
      // and move on. Ignore the memo if we are forcing a recalculation.
      if (i.descendants >= 0 && !force) return;

      // Base Case: If this item is a leaf (has no children), then we know both fields should be zero
      if (!i.children || !i.children.length) return i.descendants = i.completedDescendants = 0;

      // Recurse across the item's children. Once complete, all children will have the descendants
      // and completedDescendants fields populated and ready to work with.
      i.children.forEach(setDescendantsAndCompleted);

      // Count this item's descendants. For each child:
      //
      //   * If the child item has descendants, use that number of descendants and do _not_ count the child as one
      //   * If the child does not have descendants, count the child as one
      //
      // Doing it this way will prevent children with "100%" completion from contributing a deficit to their parent's
      // completion percentage.
      i.descendants = sum(i.children.map(x => (x.descendants || 1)));

      // Counting the item's completed descendants is similar, for similar reasons.
      // Additionally, if this parent item is checked, then we consider all descendants to be complete.
      i.completedDescendants = i.checked
        ? i.descendants : sum(i.children.map(x => (x.descendants ? x.completedDescendants : (x.checked ? 1 : 0 ))));
    }

    // Run our helper function over all top-level items
    this.items.filter(i => !i.parent_id).forEach(setDescendantsAndCompleted);
  }

  private lockItem(id: string) {
    this.get(id).subscribe(i => i.saving = true);
  }

  private unlockItem(id: string) {
    this.get(id).subscribe(i => i.saving = false);
  }


  get(id: string): Observable<ItemVM> {
    return this.loading.pipe(
      filter(l => l == false), map(x => this.items.find(i => i._id == id))
    );
  }

  getMany(ids: string[]): Observable<ItemVM[]> {
    return this.loading.pipe(
      filter(l => l == false),
      map(x => this.items.filter(i => ids.includes(i._id))),
      filter(i => !!i)
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

  getAll(): Observable<ItemVM[]> {
    return this.loading.pipe(
      filter(l => l == false),
      map(x => this.items)
    );
  }

  create(model: Item): Observable<Item> {
    if (!model.title) {
      this.error.shout('Could not create item', 'Item title may not be empty');
      return ObservableOf(null);
    } else {

      const vm = new ItemVM(model); vm.saving = true;
      const mergeItem = (i: Item) => { Object.assign(vm, i); };
      const addItem = (i) => {
        this.items.push(i);
        this.connectParentsWithChildren();
        this.calculateItemDescendantsAndCompleted(true);
      }

      addItem(vm);
      this.creating.next(vm);
      return this.http.post<Item>('/item', model).pipe(
        tap(mergeItem),
        tap(i => this.created.next(new ItemVM(i)))
      );
    }
  }

  update(model: Item): Observable<ItemVM> {
    this.updating.next(<ItemVM>model);

    return this.http.put<Item>('/item', {
      title: model.title, description: model.description, _id: model._id
    }).pipe(
      tap(i => this.updated.next(new ItemVM(i))),
      map(updated => Object.assign(<ItemVM>model, updated))
    );
  }

  check(id: string): Observable<Item> {
    this.get(id).subscribe(i => this.checking.next(i));

    return this.http.put<Item>(`/item/${id}/check`, {}).pipe(
      tap(i => this.checked.next(new ItemVM(i)))
    );
  }

  uncheck(id: string): Observable<Item> {
    this.get(id).subscribe(i => this.unchecking.next(i));

    return this.http.put<Item>(`/item/${id}/uncheck`, {}).pipe(
      tap(i => this.unchecked.next(new ItemVM(i)))
    );
  }

  delete(id: string): Observable<Item> {
    this.get(id).subscribe(i => this.deleting.next(i));

    return this.http.delete<Item>(`/item/${id}`).pipe(
      tap(i => this.deleted.next(new ItemVM(i)))
    );
  }

  move(subject: Item, newParent: Item): Observable<Item> {
    const newParentId = newParent ? newParent._id : null ;
    return this.http.put<Item>('/item', { _id: subject._id, parent_id: newParentId }).pipe(
      tap(item => this.moved.next(new ItemVM(item)))
    );
  }

}
