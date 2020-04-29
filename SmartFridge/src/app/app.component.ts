import {Component, OnInit} from '@angular/core';
import {FoodUnitService} from './foodUnit.service';
import {FoodUnit} from './main-functionality/shared/foodUnit.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FoodUnitService]
})
export class AppComponent implements OnInit {
  title = 'SmartFridge';
  loadedFeature = 'register/login';
  selectedFoodUnit: FoodUnit;
  constructor(private foodUnitService: FoodUnitService) { }

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

  getUrl() {
    return 'url(../../assets/images/background/rgback.jpg)';
  }
}
