import { Component, OnInit, Input } from '@angular/core';
import { ItemVM } from '../../models/item.model';

@Component({
  selector: 'app-item-progress-bar',
  templateUrl: './item-progress-bar.component.html',
  styleUrls: ['./item-progress-bar.component.css']
})
export class ItemProgressBarComponent implements OnInit {

  @Input() item: ItemVM;

  constructor() { }

  ngOnInit() {
  }

}
