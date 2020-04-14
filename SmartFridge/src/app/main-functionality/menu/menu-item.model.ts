import {FoodUnit} from '../shared/foodUnit.model';
export class MenuItem {
  public name: string;
  public imagePath: string;
  public foodUnits: FoodUnit[];
  constructor(name: string, imagePath: string, foodUnits: FoodUnit[]) {
    this.name = name;
    this.imagePath = imagePath;
    this.foodUnits = foodUnits;
  }
}
