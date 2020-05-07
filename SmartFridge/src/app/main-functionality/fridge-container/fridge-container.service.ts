import {EventEmitter} from '@angular/core';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';

export class FridgeContainerService {
  foodUnitsDetailedChanged = new EventEmitter<FoodUnitDetailed[]>();
  private foodUnitsDetailed: FoodUnitDetailed[] = [
  ];

  getFoodUnitsDetailed() {
    return this.foodUnitsDetailed.slice();
  }
  addFoodUnitDetailed(foodUnitDetailed: FoodUnitDetailed) {
    this.foodUnitsDetailed.push(foodUnitDetailed);
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
}
