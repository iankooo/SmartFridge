import {Component, OnInit} from '@angular/core';
import {FoodUnitService} from './foodUnit.service';
import {FoodUnit} from './main-functionality/shared/foodUnit.model';
import {FridgeContainerService} from './main-functionality/fridge-container/fridge-container.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FoodUnitService, FridgeContainerService]
})
export class AppComponent implements OnInit {
  constructor(private foodUnitService: FoodUnitService) { }
  title = 'SmartFridge';
  loadedFeature = 'register/login';
  selectedFoodUnit: FoodUnit;
  ngOnInit(): void {
    this.foodUnitService.foodUnitSelected
      .subscribe(
        (foodUnit: FoodUnit) => {
          this.selectedFoodUnit = foodUnit;
        }
      );
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
