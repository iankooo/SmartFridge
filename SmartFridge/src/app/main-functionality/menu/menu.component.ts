import { Component, OnInit } from '@angular/core';
import {MenuItem} from './menu-item.model';
import {MenuService} from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {
  selectedMenuItem: MenuItem;
  constructor(private menuItemService: MenuService) { }

  ngOnInit(): void {
    this.menuItemService.menuItemSelected
      .subscribe(
        (menuItem: MenuItem) => {
          this.selectedMenuItem = menuItem;
        }
      );
  }

}
