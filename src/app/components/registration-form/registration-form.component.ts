import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  username: string;
  password: string;
  passwordConfirm: string;

  constructor(
    private users: UserService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.users.register(this.username, this.password, this.passwordConfirm)
      .subscribe(x => {});
  }

}
