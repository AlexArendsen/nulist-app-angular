import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable()
export class OutgoingInterceptor implements HttpInterceptor {

    constructor(
        private users: UserService
    ) { } 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `${this.users.getToken()}`,
            },
            url: `/api${req.url}`
        });

        return next.handle(req);
    }
}