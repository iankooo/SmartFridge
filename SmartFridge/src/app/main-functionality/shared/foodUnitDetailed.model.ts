import {FoodUnit} from './foodUnit.model';
export class FoodUnitDetailed {
  constructor(
    public foodUnit: FoodUnit,
    public name: string,
    public amount: number,
    public amountSize: string,
    public expirationDate: string,
    public storeLocation: string
  ) {}
}

