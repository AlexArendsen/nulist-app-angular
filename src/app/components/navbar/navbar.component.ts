import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
    private users: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.users.token.subscribe(token => this.getUser());
  }

  getUser() {
    this.users.me().subscribe(user => this.user = user);
  }

  logout() { this.users.logout(); }

}
