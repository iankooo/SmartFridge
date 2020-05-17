import {Component, OnDestroy, OnInit} from '@angular/core';
import {FoodUnitService} from './foodUnit.service';
import {FoodUnit} from './main-functionality/shared/foodUnit.model';
import {FridgeContainerService} from './main-functionality/fridge-container/fridge-container.service';
import {Router} from '@angular/router';
import {AuthService} from './reg-log/reg-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FoodUnitService, FridgeContainerService]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'SmartFridge';
  loadedFeature = 'register/login';
  selectedFoodUnit: FoodUnit;
  constructor(private foodUnitService: FoodUnitService, private router: Router, private authService: AuthService) {
   // console.log(this.router.url);
  }
  ngOnInit(): void {
    this.authService.autoLogin();
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
  ngOnDestroy(): void {
    this.authService.logout();
  }
}
