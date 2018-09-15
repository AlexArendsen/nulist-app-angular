import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NavigationService } from '../../services/navigation.service';
import { MetadataService } from '../../services/metadata.service';
import { Metadata } from '../../models/metadata.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  meta: Metadata;
  authenticated = false;
  user: User;

  constructor(
    private users: UserService,
    private navigate: NavigationService,
    private metadata: MetadataService
  ) { }

  ngOnInit() {
    this.metadata.get().subscribe(md => this.meta = md);

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
