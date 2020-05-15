import {EventEmitter, Injectable} from '@angular/core';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';
import {DatePipe} from '@angular/common';

@Injectable()
export class FridgeContainerService {
  foodUnitsDetailedChanged = new EventEmitter<FoodUnitDetailed[]>();
  startedEditing = new EventEmitter<number>();
  isExpired = false;
  private foodUnitsDetailed: FoodUnitDetailed[] = [
  ];
  constructor(private datePipe: DatePipe) {}
  getFoodUnitsDetailed() {
    return this.foodUnitsDetailed.slice();
  }
  getFoodUnitDetailed(index: number) {
    return this.foodUnitsDetailed[index];
  }
  addFoodUnitDetailed(foodUnitDetailed: FoodUnitDetailed) {
    this.foodUnitsDetailed.push(foodUnitDetailed);
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
  addAllFoodUnitDetailed(foodUnitDetailed: FoodUnitDetailed[]) {
    this.foodUnitsDetailed = this.foodUnitsDetailed.concat(foodUnitDetailed);
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
  updateFoodUnitDetailed(index: number, newFoodUnitDetailed: FoodUnitDetailed) {
    this.foodUnitsDetailed[index] = newFoodUnitDetailed;
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
  deleteFoodUnitDetailed(index: number) {
    this.foodUnitsDetailed.splice(index, 1);
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
  deleteAllExpiredFoodUnitsDetailed() {
    for (const item of this.foodUnitsDetailed) {
      if (this.checkIfExpired(item)) {
        this.foodUnitsDetailed.splice(this.foodUnitsDetailed.indexOf(item), 1);
        this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
      }
    }
  }
  checkIfExpired(currentFoodUnitDetailed: FoodUnitDetailed) {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const currentYear: number = +currentDate.slice(0, 4);
    const currentMonth: number = +currentDate.slice(5, 7);
    const currentDay: number = +currentDate.slice(8, 10);
    const expirationDate: number[] = currentFoodUnitDetailed.expirationDate.split('/', 3).map(Number);
    const expirationMonth: number = expirationDate[0];
    const expirationDay: number = expirationDate[1];
    const expirationYear: number = expirationDate[2];
    if (currentYear > expirationYear) {
      return true;
    } else if (currentYear === expirationYear && currentMonth > expirationMonth) {
      return true;
    } else if (currentYear === expirationYear && currentMonth === expirationMonth && currentDay > expirationDay) {
      return true;
    } else {
      return false;
    }
  }
  getColor(currentFoodUnitDetailed: FoodUnitDetailed) {
    this.isExpired = this.checkIfExpired(currentFoodUnitDetailed);
    return this.isExpired === false ? 'darkgreen' : 'darkred';
  }
}
