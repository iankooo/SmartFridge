import { MenuItem } from './menu-item.model';
import { EventEmitter } from '@angular/core';
import {FoodUnit} from '../shared/foodUnit.model';
export class MenuService {
  menuItemSelected = new EventEmitter<MenuItem>();
  private menuItems: MenuItem[] = [
    new MenuItem(
      'Fruits',
      'assets/images/fruits.jpg',
      [
        new FoodUnit('Banana', 'Banana', 'assets/images/banana.jpg', 6, 0, 0),
        new FoodUnit('Strawberry', 'Strawberry', 'assets/images/strawberry.jpg', 6, 0, 0),
        new FoodUnit('Cherry', 'Cherry', 'assets/images/cherry.jpg', 4, 0, 0),
        new FoodUnit('Kiwi', 'Kiwi', 'assets/images/kiwi.jpg', 6, 0, 0),
        new FoodUnit('Orange', 'Orange', 'assets/images/orange.png', 7, 0, 0),
        new FoodUnit('Mango', 'Mango', 'assets/images/mango.jpg', 8, 0, 0),
        new FoodUnit('Grape', 'Grape', 'assets/images/grape.jpg', 6, 0, 0)
      ]
    ),
    new MenuItem(
      'Vegetables',
      'assets/images/vegetables.jpg',
      [
        new FoodUnit('Tomato', 'Tomato', 'assets/images/tomato.jpg', 4, 0, 0),
        new FoodUnit('Onion', 'Onion', 'assets/images/onion.JPG', 0, 1, 0)
      ]),
    new MenuItem(
      'Dairy Products',
      'assets/images/dairy-products.jpg',
      [
        new FoodUnit(
          'Milk', 'Milk', 'https://p1.pxfuel.com/preview/375/778/543/milk-bottle-milk-bottle-glass-royalty-free-thumbnail.jpg', 2, 0, 0)
      ]),
    new MenuItem(
      'Bakery Products',
      'assets/images/bakery-products.jpg',
      [
        new FoodUnit('Bread', 'Bread', 'assets/images/bread.jpg', 3, 0, 0)
      ])
  ];

  getMenuItems() {
    return this.menuItems.slice();
  }
}
