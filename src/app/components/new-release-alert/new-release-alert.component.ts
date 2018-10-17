import { Component, OnInit } from '@angular/core';
import { Metadata } from '../../models/metadata.model';
import { MetadataService } from '../../services/metadata.service';

@Component({
  selector: 'app-new-release-alert',
  templateUrl: './new-release-alert.component.html',
  styleUrls: ['./new-release-alert.component.css']
})
export class NewReleaseAlertComponent implements OnInit {

  meta: Metadata
  urlsDiffer = false;
  dismissed = false;

  constructor(
    private metadata: MetadataService
  ) { }

  ngOnInit() {
    this.metadata.get().subscribe(md => this.setMeta(md));
  }

  setMeta(md: Metadata) {
    this.meta = md;
    this.urlsDiffer = this.metadata.isCurrentRelease(md.appUrl);
  }

}
