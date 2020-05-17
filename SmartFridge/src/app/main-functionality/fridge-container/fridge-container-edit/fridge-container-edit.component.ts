import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FridgeContainerService} from '../fridge-container.service';

import {FoodUnitDetailed} from '../../shared/foodUnitDetailed.model';
import {FoodUnit} from '../../shared/foodUnit.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-fridge-container-edit',
  templateUrl: './fridge-container-edit.component.html',
  styleUrls: ['./fridge-container-edit.component.css']
})
export class FridgeContainerEditComponent implements OnInit, OnDestroy {
  @Input() foodUnit: FoodUnit;
  @ViewChild('f') fridgeContainerForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedFoodUnitIndex: number;
  editedFoodUnitDetailed: FoodUnitDetailed;

  constructor(private fridgeContainerService: FridgeContainerService) { }

  ngOnInit(): void {
    this.subscription = this.fridgeContainerService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedFoodUnitIndex = index;
          this.editMode = true;
          this.editedFoodUnitDetailed = this.fridgeContainerService.getFoodUnitDetailed(index);
          this.fridgeContainerForm.setValue({
            name: this.editedFoodUnitDetailed.name,
            quantity: this.editedFoodUnitDetailed.amount,
            size: this.editedFoodUnitDetailed.amountSize,
            date: this.editedFoodUnitDetailed.expirationDate,
            storeName: this.editedFoodUnitDetailed.storeLocation
          });
        }
      );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      const newFoodUnitDetailed = new FoodUnitDetailed(
        new FoodUnit(value.name, '', '', 0, 0, 0),
        value.name,
        value.quantity,
        value.size,
        this.editedFoodUnitDetailed.expirationDate,
        value.storeName);
      this.fridgeContainerService.updateFoodUnitDetailed(this.editedFoodUnitIndex, newFoodUnitDetailed);
    } else {
      const newFoodUnitDetailed = new FoodUnitDetailed(
        new FoodUnit(value.name, '', '', 0, 0, 0),
        value.name,
        value.quantity,
        value.size,
        value.date,
        value.storeName);
      this.fridgeContainerService.addFoodUnitDetailed(newFoodUnitDetailed);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.fridgeContainerForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.fridgeContainerService.deleteFoodUnitDetailed(this.editedFoodUnitIndex);
    this.onClear();

  }
  onDeleteAllExpired() {
    this.fridgeContainerService.deleteAllExpiredFoodUnitsDetailed();
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
