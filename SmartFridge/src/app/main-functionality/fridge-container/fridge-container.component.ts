import { Component, OnInit} from '@angular/core';
import {FridgeContainerService} from './fridge-container.service';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';
@Component({
  selector: 'app-fridge-container',
  templateUrl: './fridge-container.component.html',
  styleUrls: ['./fridge-container.component.css']
})
export class FridgeContainerComponent implements OnInit {
  foodUnitsDetailed: FoodUnitDetailed[] = [];

  constructor(private fridgeContainerService: FridgeContainerService) { }

  ngOnInit(): void {
    this.foodUnitsDetailed = this.fridgeContainerService.getFoodUnitsDetailed();
    this.fridgeContainerService.foodUnitsDetailedChanged
      .subscribe(
        (foodUnitsDetailed: FoodUnitDetailed[]) => {
          this.foodUnitsDetailed = foodUnitsDetailed;
        }
      );
  }
}
