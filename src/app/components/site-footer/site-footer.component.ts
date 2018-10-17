import { Component, OnInit } from '@angular/core';

import { merge as ObservableMerge } from 'rxjs';

import { Metadata } from '../../models/metadata.model';
import { MetadataService } from '../../services/metadata.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {

  meta: Metadata;
  nItems: number = -1;
  nChecked: number = -1;

  newReleaseAvailable: boolean;
  newReleaseUrl: string;

  constructor(
    private metadata: MetadataService,
    private items: ItemService
  ) { }

  ngOnInit() {
    this.metadata.get().subscribe(md => this.setMetadata(md));

    ObservableMerge(
      this.items.created,
      this.items.deleted,
      this.items.checked,
      this.items.unchecked
    ).subscribe(x => this.updateItemCount());
    this.updateItemCount();
  }

  updateItemCount() {
    this.items.getAll().subscribe(list => {
      this.nItems = list.length;
      this.nChecked = list.filter(i => i.checked).length;
    })
  }

  setMetadata(md: Metadata) {
    this.meta = md;

    if(this.newReleaseAvailable = this.metadata.isCurrentRelease(md.appUrl))
      this.newReleaseUrl = md.appUrl;
  }

}
