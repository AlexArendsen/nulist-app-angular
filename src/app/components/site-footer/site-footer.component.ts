import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {

  isAuthenticated = false;

  constructor(
    private users: UserService
  ) { }

  ngOnInit() {
    this.users.token.subscribe(token => this.isAuthenticated = !!token);
  }

}
