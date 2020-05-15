import {Component, OnInit} from '@angular/core';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';
import {WishListService} from './wish-list.service';
import {NamePipe} from '../name.pipe';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  providers: [NamePipe]
})
export class WishListComponent implements OnInit {
  foodUnitsDetailed: FoodUnitDetailed[] = [];
  page = 1;
  pageSize = 6;
  searchedName: '';
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
  onEditItem(index: number) {
    this.wishListService.startedEditing.emit(index);
  }
  getColor(currentFoodUnitDetailed: FoodUnitDetailed) {
    return this.wishListService.getColor(currentFoodUnitDetailed);
  }
}
