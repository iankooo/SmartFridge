import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FoodUnitDetailed} from '../../shared/foodUnitDetailed.model';
import {NgForm} from '@angular/forms';
import {WishListService} from '../wish-list.service';
import {FoodUnit} from '../../shared/foodUnit.model';
import {Subscription} from 'rxjs/index';
import {FridgeContainerService} from '../../fridge-container/fridge-container.service';

@Component({
  selector: 'app-wish-list-edit',
  templateUrl: './wish-list-edit.component.html',
  styleUrls: ['./wish-list-edit.component.css']
})
export class WishListEditComponent implements OnInit, OnDestroy {
  @Input() foodUnit: FoodUnit;
  @ViewChild('f') wishListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedFoodUnitIndex: number;
  editedFoodUnitDetailed: FoodUnitDetailed;

  constructor(private wishListService: WishListService, private fridgeContainerService: FridgeContainerService) { }

  ngOnInit(): void {
    this.subscription = this.wishListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedFoodUnitIndex = index;
          this.editMode = true;
          this.editedFoodUnitDetailed = this.wishListService.getFoodUnitDetailed(index);
          this.wishListForm.setValue({
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
    const newFoodUnitDetailed = new FoodUnitDetailed(new FoodUnit('', '', '', 0, 0, 0),
      value.name, value.quantity, value.size, value.date, value.storeName);
    if (this.editMode) {
      this.wishListService.updateFoodUnitDetailed(this.editedFoodUnitIndex, newFoodUnitDetailed);
    } else {
      this.wishListService.addFoodUnitDetailed(newFoodUnitDetailed);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.wishListForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.wishListService.deleteFoodUnitDetailed(this.editedFoodUnitIndex);
    this.onClear();

  }
  onDeleteAllExpired() {
    this.wishListService.deleteAllExpiredFoodUnitsDetailed();
    this.onClear();
  }
  onMoveToFridge(form: NgForm) {
    const value = form.value;
    const newFoodUnitDetailed = new FoodUnitDetailed(new FoodUnit('', '', '', 0, 0, 0)
      , value.name, value.quantity, value.size, value.date, value.storeName);
    this.fridgeContainerService.addFoodUnitDetailed(newFoodUnitDetailed);
    this.wishListService.deleteFoodUnitDetailed(this.editedFoodUnitIndex);
    this.editMode = false;
    form.reset();
  }
  onMoveAll() {
     this.fridgeContainerService.addAllFoodUnitDetailed(this.wishListService.foodUnitsDetailed);
     this.wishListService.deleteAll();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
