import { Component, OnInit } from '@angular/core';

import { Metadata } from '../../models/metadata.model';
import { MetadataService } from '../../services/metadata.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {

  meta: Metadata;

  constructor(
    private metadata: MetadataService
  ) { }

  ngOnInit() {
    this.metadata.get().subscribe(md => this.meta = md);
  }

}
