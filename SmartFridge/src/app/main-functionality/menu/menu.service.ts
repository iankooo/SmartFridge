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
        new FoodUnit('Onion', '40 calories/100g', 'assets/images/onion.JPG', 0, 1, 0),
        new FoodUnit('Cucumber', '15 calories/100g', 'assets/images/cucumber.jpg', 0, 1, 0),
        new FoodUnit('Eggplant', '25 calories/100g', 'assets/images/eggplant.jpg', 7, 0, 0),
        new FoodUnit('Garlic', '149 calories/100g', 'assets/images/garlic.jpg', 14, 0, 0)
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
          0),
        new FoodUnit(
          'Cheese',
          '402 calories/100g',
          'assets/images/cheese.jpg',
          5,
          0,
          0),
        new FoodUnit(
          'Sour cream',
          '193 calories/100g',
          'assets/images/sour_cream.jpg',
          4,
          0,
          0)
      ]),
    new MenuItem(
      'Bakery Products',
      'assets/images/bakery-products.jpg',
      [
        new FoodUnit('Bread', '265 calories/100g', 'assets/images/bread.jpg', 3, 0, 0),
        new FoodUnit('Pretzel', '380 calories/100g', 'assets/images/pretzel.jpg', 8, 0, 0),
        new FoodUnit('Muffin', '377 calories/100g', 'assets/images/muffin.jpg', 4, 0, 0)
      ]),
    new MenuItem(
      'Meat',
      'assets/images/meat.jpg',
      [
        new FoodUnit('Chicken', '239 calories/100g', 'assets/images/chicken.jpg', 10, 0, 0),
        new FoodUnit('Pork', '242 calories/100g', 'assets/images/pork.jpg', 10, 0, 0)
      ]),
    new MenuItem(
      'Preserves',
      'assets/images/preserves.jpg',
      [
        new FoodUnit('Preserves Strawberry', '50 calories/100g', 'assets/images/preserves_strawberry.jpg', 0, 6, 0),
        new FoodUnit('Honey', '304 calories/100g', 'assets/images/honey.jpg', 0, 0, 1)
      ]),
    new MenuItem(
      'Sweets',
      'assets/images/sweets.jpg',
      [
        new FoodUnit('Milka', '540 calories/100g', 'assets/images/milka.jpg', 0, 2, 0),
        new FoodUnit('Sugus', '540 calories/100g', 'assets/images/sugus.jpg', 0, 3, 0)
      ]),
    new MenuItem(
      'Frozen products',
      'assets/images/frozen_products.jpg',
      [
        new FoodUnit('Frozen Berries', '33 calories/100g', 'assets/images/berries.jpg', 0, 0, 4),
      ]),
    new MenuItem(
      'Drinks',
      'assets/images/drinks.jpg',
      [
        new FoodUnit('Champagne', '80 calories/100g', 'assets/images/champagne.jpg', 0, 0, 3),
        new FoodUnit('Wine', '83 calories/100g', 'assets/images/wine.jpg', 0, 0, 5),
        new FoodUnit('Beer', '43 calories/100g', 'assets/images/beer.jpg', 0, 0, 5)
      ])
  ];

  getMenuItems() {
    return this.menuItems.slice();
  }
}
