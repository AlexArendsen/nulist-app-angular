import { Component, OnInit, TemplateRef, Input } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { finalize } from 'rxjs/operators';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-move-button',
  templateUrl: './item-move-button.component.html',
  styleUrls: ['./item-move-button.component.css']
})
export class ItemMoveButtonComponent implements OnInit {

  @Input() source: Item;
  @Input() disabled = false;
  moving = false;

  modal: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private items: ItemService
  ) { }

  ngOnInit() {
  }

  showMoveModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template)
  }

  hideMoveModal() {
    this.modal.hide();
  }

  doMove(destination: Item) {
    this.moving = true;
    this.items.move(this.source, destination).pipe(
      finalize(() => this.moving = false)
    ).subscribe(x => this.hideMoveModal());
  }

}
