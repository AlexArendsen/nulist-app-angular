import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item.model';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(
    private navigate: NavigationService
  ) { }

  selectedItemId: string;

  ngOnInit() {
    this.navigate.selectedItem
      .subscribe(item => this.selectedItemId = item ? item._id : null);
  }

}
