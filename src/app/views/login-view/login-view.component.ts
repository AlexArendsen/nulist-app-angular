import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { filter } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  action = 'login'

  constructor(
    private users: UserService,
    private navigate: NavigationService
  ) { }

  ngOnInit() {
    this.users.token.pipe(
      filter(token => !!token)
    ).subscribe(x => this.navigate.toRoot());
  }

}
