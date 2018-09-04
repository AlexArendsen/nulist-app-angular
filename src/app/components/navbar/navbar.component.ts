import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated = false;
  user: User;

  constructor(
    private users: UserService,
    private navigate: NavigationService
  ) { }

  ngOnInit() {
    this.users.token.pipe(
      tap(token => this.authenticated = !!token)
    ).subscribe(token => this.getUser());
  }

  getUser() {
    this.users.me().subscribe(user => this.user = user);
  }

  logout() { this.users.logout(); }

  toRoot() { this.navigate.toRoot(); }

  toOutline() { this.navigate.toOutline(); }

}
