import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { finalize, filter } from 'rxjs/operators';

import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-item-delete-button',
  templateUrl: './item-delete-button.component.html',
  styleUrls: ['./item-delete-button.component.css']
})
export class ItemDeleteButtonComponent implements OnInit {

  @Input() item: Item;
  @Input() disabled = false;
  deleting = false;

  modal: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private items: ItemService,
    private navigate: NavigationService
  ) { }

  ngOnInit() { }

  showDeleteModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template)
  }

  hideDeleteModal() {
    this.modal.hide();
  }

  doDelete() {
    this.deleting = true;
    const toDelete = Object.assign(this.item);

    const onSuccess = () => {
      this.deleting = false;
      this.hideDeleteModal();

      // Only navigate up after delete if we're still looking at the to-be-deleted item.
      this.navigate.selectedItem.subscribe(selected => {
        if (selected == null || toDelete._id != selected._id) return;
        else if (toDelete.parent_id) this.navigate.toItem(toDelete.parent_id);
        else this.navigate.toRoot();
      });
    }

    this.items.delete(toDelete._id).pipe(
      finalize(onSuccess)
    ).subscribe(x => {});
  }
}
