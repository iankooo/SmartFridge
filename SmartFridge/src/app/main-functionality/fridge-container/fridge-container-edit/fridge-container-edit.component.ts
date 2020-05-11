import {Component, Input, OnInit} from '@angular/core';
import {FridgeContainerService} from '../fridge-container.service';

import {FoodUnitDetailed} from '../../shared/foodUnitDetailed.model';
import {FoodUnit} from '../../shared/foodUnit.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-fridge-container-edit',
  templateUrl: './fridge-container-edit.component.html',
  styleUrls: ['./fridge-container-edit.component.css']
})
export class FridgeContainerEditComponent implements OnInit {
  @Input() foodUnit: FoodUnit;
  constructor(private fridgeContainerService: FridgeContainerService) { }

  ngOnInit(): void {
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newFoodUnitDetailed = new FoodUnitDetailed(this.foodUnit, value.name, value.amount, value.size, value.date);
    this.fridgeContainerService.addFoodUnitDetailed(newFoodUnitDetailed);
  }
}
