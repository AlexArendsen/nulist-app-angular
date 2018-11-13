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

  public LOCAL_STORAGE_TOKEN_NAME = 'nulist-jwt';
  public token: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {
    this.restoreSession();

    this.token.subscribe(token => (token)
      ? localStorage.setItem(this.LOCAL_STORAGE_TOKEN_NAME, token)
      : localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_NAME)
    );
  }

  private restoreSession() {
    const token = localStorage.getItem(this.LOCAL_STORAGE_TOKEN_NAME)
    if (token) this.token.next(token);
  }

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

  count(): Observable<number> { return this.http.get<number>('/count'); }

  getToken(): string { return this.token.getValue(); }

}
