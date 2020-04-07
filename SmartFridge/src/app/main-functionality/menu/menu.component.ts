import { Component, OnInit } from '@angular/core';
import {MenuItem} from "./menu-item.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selectedMenuItem: MenuItem;
  constructor() { }

  ngOnInit(): void {
  }

}
