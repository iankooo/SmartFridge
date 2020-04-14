import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../menu-item.model';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menuItems: MenuItem[];
  constructor(private menuItemService: MenuService) { }

  ngOnInit(): void {
    this.menuItems = this.menuItemService.getMenuItems();
  }
}
