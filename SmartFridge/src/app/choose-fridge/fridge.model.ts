import {FoodUnitDetailed} from '../main-functionality/shared/foodUnitDetailed.model';

export class Fridge {
  public name: string;
  public owner: string;
  public wishList: FoodUnitDetailed[];
  public fridgeContainer: FoodUnitDetailed[];

  constructor(name: string, owner: string) {
    this.name = name;
    this.owner = owner;
    this.fridgeContainer = [];
    this.wishList = [];
  }
}
