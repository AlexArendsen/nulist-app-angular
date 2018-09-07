import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Metadata } from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Metadata> {
    return this.http.get<Metadata>('/meta');
  }

}
