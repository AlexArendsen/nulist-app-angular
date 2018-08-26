import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  selectedItemId: string;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedItemId = params.get('id')
    });
  }

}
