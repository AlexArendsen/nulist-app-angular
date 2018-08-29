import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../../models/item.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-outline-view',
  templateUrl: './outline-view.component.html',
  styleUrls: ['./outline-view.component.css']
})
export class OutlineViewComponent implements OnInit {

  constructor(
    private  navigate: NavigationService
  ) { }

  ngOnInit() {
  }

  goToItem(item: Item) {
    this.navigate.toItem(item._id);
  }

}
