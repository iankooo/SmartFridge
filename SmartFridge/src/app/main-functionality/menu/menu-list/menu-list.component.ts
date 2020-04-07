import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from '../menu-item.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Output() menuItemWasSelected = new EventEmitter<MenuItem>();
  menuItems: MenuItem[] = [
    new MenuItem('Fruits',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/800px-Culinary_fruits_front_view.jpg'),
    new MenuItem('Vegetables',
      'https://live.staticflickr.com/5472/9041948559_ae975fe9d8_b.jpg'),
    new MenuItem('Dairy Products',
      'https://live.staticflickr.com/4890/45490908735_f50da62742_b.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onMenuItemSelected(menuItem: MenuItem) {
    this.menuItemWasSelected.emit(menuItem);
  }
}
