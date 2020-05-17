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
    const newFoodUnitDetailed = new FoodUnitDetailed(
      this.foodUnit,
      value.name,
      value.quantity,
      value.size,
      this.editedFoodUnitDetailed.expirationDate,
      value.storeName
    );
    if (this.editMode) {
      this.fridgeContainerService.updateFoodUnitDetailed(this.editedFoodUnitIndex, newFoodUnitDetailed);
    } else {
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
