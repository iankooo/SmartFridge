import { Component, OnInit } from '@angular/core';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';
import {WishListService} from './wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  foodUnitsDetailed: FoodUnitDetailed[] = [];
  constructor(private wishListService: WishListService) { }

  ngOnInit(): void {
    this.foodUnitsDetailed = this.wishListService.getFoodUnitsDetailed();
    this.wishListService.foodUnitsDetailedChanged
      .subscribe(
        (foodUnitsDetailed: FoodUnitDetailed[]) => {
          this.foodUnitsDetailed = foodUnitsDetailed;
        }
      );
  }

}
