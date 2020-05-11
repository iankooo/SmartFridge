import { Component, OnInit } from '@angular/core';
import {MenuItem} from './menu-item.model';
import {MenuService} from './menu.service';
import {AuthService} from '../../reg-log/reg-log.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {
  selectedMenuItem: MenuItem;
  constructor(private menuItemService: MenuService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.menuItemService.menuItemSelected
      .subscribe(
        (menuItem: MenuItem) => {
          this.selectedMenuItem = menuItem;
        }
      );
  }

}
