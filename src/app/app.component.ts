import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private users: UserService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.users.token.pipe(
      filter(token => !token)
    ).subscribe(x => this.router.navigate(['/login']));
  }

}
