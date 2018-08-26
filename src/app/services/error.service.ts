import { Injectable } from '@angular/core';

import { ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toaster: ToasterService
  ) { }

  shout(title: string, message: string) {
    this.toaster.pop('error', title, message);
  }

}
