import {EventEmitter, Injectable} from '@angular/core';
import {FoodUnit} from './main-functionality/shared/foodUnit.model';
import {FridgeContainerService} from './main-functionality/fridge-container/fridge-container.service';
import {FoodUnitDetailed} from './main-functionality/shared/foodUnitDetailed.model';
import {WishListService} from './main-functionality/wish-list/wish-list.service';
@Injectable()
export class FoodUnitService {
  foodUnitSelected = new EventEmitter<FoodUnit>();
  constructor(private fridgeContainerService: FridgeContainerService, private wishListService: WishListService) {}
  addFoodUnitToFridgeList(foodUnitDetailed: FoodUnitDetailed) {
    this.fridgeContainerService.addFoodUnitDetailed(foodUnitDetailed);
  }
  addFoodUnitToWishList(foodUnitDetailed: FoodUnitDetailed) {
    this.wishListService.addFoodUnitDetailed(foodUnitDetailed);
  }
}
