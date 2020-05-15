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
        new FoodUnit('Banana', '89 calories/100g', 'assets/images/banana.jpg', 6, 0, 0),
        new FoodUnit('Strawberry', '33 calories/100g', 'assets/images/strawberry.jpg', 6, 0, 0),
        new FoodUnit('Cherry', '50 calories/100g', 'assets/images/cherry.jpg', 4, 0, 0),
        new FoodUnit('Kiwi', '61 calories/100g', 'assets/images/kiwi.jpg', 6, 0, 0),
        new FoodUnit('Orange', '47 calories/100g', 'assets/images/orange.png', 7, 0, 0),
        new FoodUnit('Mango', '60 calories/100g', 'assets/images/mango.jpg', 8, 0, 0),
        new FoodUnit('Grape', '67 calories/100g', 'assets/images/grape.jpg', 6, 0, 0)
      ]
    ),
    new MenuItem(
      'Vegetables',
      'assets/images/vegetables.jpg',
      [
        new FoodUnit('Tomato', '18 calories/100g', 'assets/images/tomato.jpg', 4, 0, 0),
        new FoodUnit('Onion', '40 calories/100g', 'assets/images/onion.JPG', 0, 1, 0)
      ]),
    new MenuItem(
      'Dairy Products',
      'assets/images/dairy-products.jpg',
      [
        new FoodUnit(
          'Milk',
          '42 calories/100g',
          'https://p1.pxfuel.com/preview/375/778/543/milk-bottle-milk-bottle-glass-royalty-free-thumbnail.jpg',
          2,
          0,
          0)
      ]),
    new MenuItem(
      'Bakery Products',
      'assets/images/bakery-products.jpg',
      [
        new FoodUnit('Bread', '265 calories/100g', 'assets/images/bread.jpg', 3, 0, 0)
      ])
  ];

  getMenuItems() {
    return this.menuItems.slice();
  }
}
