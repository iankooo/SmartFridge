import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../menu-item.model';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {
  @Input() menuItem: MenuItem;
  constructor() { }

  ngOnInit(): void {
  }

}
