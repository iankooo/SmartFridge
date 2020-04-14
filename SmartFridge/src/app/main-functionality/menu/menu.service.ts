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
        new FoodUnit('Banana', 'Banana', 'assets/images/banana.jpg'),
        new FoodUnit('Strawberry', 'Strawberry', 'assets/images/strawberry.jpg'),
        new FoodUnit('Cherry', 'Cherry', 'assets/images/cherry.jpg'),
        new FoodUnit('Kiwi', 'Kiwi', 'assets/images/kiwi.jpg'),
        new FoodUnit('Orange', 'Orange', 'assets/images/orange.png'),
        new FoodUnit('Mango', 'Mango', 'assets/images/mango.jpg'),
        new FoodUnit('Grape', 'Grape', 'assets/images/grape.jpg')
      ]
    ),
    new MenuItem(
      'Vegetables',
      'assets/images/vegetables.jpg',
      [
        new FoodUnit('Tomato', 'Tomato', 'assets/images/tomato.jpg'),
        new FoodUnit('Onion', 'Onion', 'assets/images/onion.JPG')
      ]),
    new MenuItem(
      'Dairy Products',
      'assets/images/dairy-products.jpg',
      [
        new FoodUnit('Milk', 'Milk', 'https://p1.pxfuel.com/preview/375/778/543/milk-bottle-milk-bottle-glass-royalty-free-thumbnail.jpg')
      ]),
    new MenuItem(
      'Bakery Products',
      'assets/images/bakery-products.jpg',
      [
        new FoodUnit('Bread', 'Bread', 'assets/images/bread.jpg')
      ])
  ];

  getMenuItems() {
    return this.menuItems.slice();
  }
}
