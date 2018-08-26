import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filter, finalize } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private users: UserService,
    private router: Router
  ) { }

  username: string;
  password: string;
  loggingIn = false;

  private subs: Subscription = new Subscription();

  ngOnInit() { }

  login() {
    this.loggingIn = true;
    this.users.login(this.username, this.password).pipe(
      finalize(() => this.loggingIn = false),
      filter(token => !!token && !!token.token)
    ).subscribe(token => {});
  }

}
