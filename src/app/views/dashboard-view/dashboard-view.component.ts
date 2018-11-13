import { Component, OnInit } from '@angular/core';

import { RecentItemService } from '../../services/recent-item.service';
import { ItemVM } from '../../models/item.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  public recentItems: ItemVM[] = [];

  constructor(
    private recentItemService: RecentItemService
  ) { }

  ngOnInit() {
    this.recentItemService.recent.pipe(
      map(list => list.slice(0, 5))
    ).subscribe(list => {
      this.recentItems = list
    })
  }

}
