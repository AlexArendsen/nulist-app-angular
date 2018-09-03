import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

  @Input() loading = false;

  constructor() { }

  ngOnInit() {
  }

}
