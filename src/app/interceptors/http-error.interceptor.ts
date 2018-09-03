import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private error: ErrorService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const noop = (a: any) => {};
        const handleError = (e: HttpErrorResponse) => {
            switch(e.status) {
                case 0:
                case 502:
                case 503:
                case 504: { this.error.shout('Service Disconnected', 'Connection to service has been lost.'); break; }
                case 400: { this.error.shout('Bad Request', 'The service could not respond to the request. This is probably a bug.'); break; }
                case 401: { this.error.shout('Authorization Error', 'Request could not be completed because of inadequate permissions.'); break; }
                case 403: { this.error.shout('Authenticaion Error', 'You session may have expired. Please log out and log back in.'); break; }
                case 404: { this.error.shout('Resource Not Found', 'The resource requested could not be found.'); break; }
                default:  { this.error.shout('Error', `An unanticipated error occurred and the request could not be completed. (HTTP ${e.status}: ${e.statusText})`); break; }
            }
        };

        return next.handle(request).pipe(
            tap(noop, (e) => {
                if (e instanceof HttpErrorResponse) handleError(e);
            })
        );

    }
}