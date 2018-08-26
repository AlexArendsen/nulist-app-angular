import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of as ObservableOf } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/login', {username, password}).pipe(
      tap(res => res.token && this.token.next(res.token))
    );
  }

  logout(): Observable<any> { this.token.next(null); return ObservableOf(null); }

  register(username: string, password: string, passwordConfirm: string): Observable<any> {
    if (password !== passwordConfirm) {
      this.error.shout('Registration Error', 'Passwords do not match');
      return ObservableOf(null);
    }
    return this.http.post('/register', {username, password}).pipe(
      tap(res => res.token && this.token.next(res.token))
    );
  }
  
  me(): Observable<User> { return this.http.get<User>('/me'); }

  getToken(): string { return this.token.getValue(); }

}
