import { Component, OnInit} from '@angular/core';
import {FridgeContainerService} from './fridge-container.service';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';
import {NamePipe} from '../name.pipe';
@Component({
  selector: 'app-fridge-container',
  templateUrl: './fridge-container.component.html',
  styleUrls: ['./fridge-container.component.css'],
  providers: [NamePipe]
})
export class FridgeContainerComponent implements OnInit {
  public foodUnitsDetailed: FoodUnitDetailed[];
  page = 1;
  pageSize = 6;
  searchedName: '';
  constructor(private fridgeContainerService: FridgeContainerService) { }

  ngOnInit(): void {
    this.fridgeContainerService.getFoodUnitsDetailed();
    this.foodUnitsDetailed = this.fridgeContainerService.foodUnitsDetailed;
    this.fridgeContainerService.foodUnitsDetailedChanged
      .subscribe(
        (foodUnitsDetailed: FoodUnitDetailed[]) => {
          this.foodUnitsDetailed = foodUnitsDetailed;
        }
      );
  }

  onEditItem(index: number) {
    this.fridgeContainerService.startedEditing.emit(index + (this.page - 1 ) * this.pageSize);
  }
  getColor(currentFoodUnitDetailed: FoodUnitDetailed) {
    return this.fridgeContainerService.getColor(currentFoodUnitDetailed);
  }
  searchName() {
    if (this.searchedName !== '') {
      this.foodUnitsDetailed = this.foodUnitsDetailed.filter(res => {
        return res.name.toLocaleLowerCase().match(this.searchedName.toLocaleLowerCase());
      });
    } else if (this.searchedName === '') {
       this.ngOnInit();
    }
  }
}
