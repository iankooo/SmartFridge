import {EventEmitter} from '@angular/core';
import {FoodUnit} from './main-functionality/shared/foodUnit.model';
export class FoodUnitService {
  foodUnitSelected = new EventEmitter<FoodUnit>();
}
