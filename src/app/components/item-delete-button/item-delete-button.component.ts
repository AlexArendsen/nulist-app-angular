import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { finalize } from 'rxjs/operators';

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

    const onSuccess = () => {
      this.deleting = false;
      this.hideDeleteModal();
      if (this.item.parent_id) this.navigate.toItem(this.item.parent_id);
      else this.navigate.toRoot();
    }

    this.items.delete(this.item._id).pipe(
      finalize(onSuccess)
    ).subscribe(x => {});
  }
}
