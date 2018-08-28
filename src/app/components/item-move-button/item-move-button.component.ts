import { Component, OnInit, TemplateRef, Input } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-move-button',
  templateUrl: './item-move-button.component.html',
  styleUrls: ['./item-move-button.component.css']
})
export class ItemMoveButtonComponent implements OnInit {

  @Input() source: Item;

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
    this.items.move(this.source, destination)
      .subscribe(x => this.hideMoveModal());
  }

}
