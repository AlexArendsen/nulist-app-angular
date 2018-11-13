import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-analytics-view',
  templateUrl: './admin-analytics-view.component.html',
  styleUrls: ['./admin-analytics-view.component.css']
})
export class AdminAnalyticsViewComponent implements OnInit {

  nUsers: number = -1;

  constructor(
    private users: UserService
  ) { }

  ngOnInit() {
    this.users.count().subscribe(count => this.nUsers = count);
  }

}
