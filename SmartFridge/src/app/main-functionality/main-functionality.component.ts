import {Component, Input, OnInit} from '@angular/core';
import {FoodUnit} from './shared/foodUnit.model';
import {FoodUnitService} from '../foodUnit.service';
import {formatDate} from '@angular/common';
import {AuthService} from '../reg-log/reg-log.service';

@Component({
  selector: 'app-main-functionality',
  templateUrl: './main-functionality.component.html',
  styleUrls: ['./main-functionality.component.css']
})
export class MainFunctionalityComponent implements OnInit {
  feature = 'fridge-container';
  selectedFoodUnit: FoodUnit;
  menuDetailOn: boolean;
  expirationDateSelected: string;
  constructor(private foodUnitService: FoodUnitService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.foodUnitService.foodUnitSelected
      .subscribe(
        (foodUnit: FoodUnit) => {
          this.menuDetailOn = true;
          this.selectedFoodUnit = foodUnit;
          const currentDate: string = formatDate(new Date(), 'yyyy/MM/dd', 'en').toLocaleString();
          const year: number = +currentDate.slice(0, 4);
          const month: number = +currentDate.slice(5, 7);
          const day: number = +currentDate.slice(8, 10);
          const redefYear = year + foodUnit.nrOfExpirationYears;
          const redefMonth = month + foodUnit.nrOfExpirationMonths;
          const redefDay = day + foodUnit.nrOfExpirationDays;
          if (redefDay < 10 && redefMonth < 10) {
            this.expirationDateSelected = redefYear + '-0' + redefMonth + '-0' + redefDay;
          } else if (redefMonth < 10) {
            this.expirationDateSelected = redefYear + '-0' + redefMonth + '-' + redefDay;
          } else if (redefDay < 10) {
            this.expirationDateSelected = redefYear + '-' + redefMonth + '-0' + redefDay;
          } else {
            this.expirationDateSelected = redefYear + '-' + redefMonth + '-' + redefDay;
          }
        }
      );
  }
  onSelectContainer(feature: string) {
    this.feature = feature;
  }
  closeMenuDetail(value: boolean) {
    this.menuDetailOn = value;
  }
}
