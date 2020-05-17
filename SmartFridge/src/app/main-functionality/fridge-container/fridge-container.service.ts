import {EventEmitter, Injectable} from '@angular/core';
import {FoodUnitDetailed} from '../shared/foodUnitDetailed.model';
import {DatePipe} from '@angular/common';
import {AngularFireDatabase} from '@angular/fire/database';
import {Global} from '../../shared/global';
import * as firebase from 'firebase';

@Injectable()
export class FridgeContainerService {
  foodUnitsDetailedChanged = new EventEmitter<FoodUnitDetailed[]>();
  startedEditing = new EventEmitter<number>();
  isExpired = false;
  public foodUnitsDetailed: FoodUnitDetailed[] = [];

  constructor(private datePipe: DatePipe, private db: AngularFireDatabase, private fridgeKey: Global) {}

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      // console.log('doi: ' + this.foodUnitsDetailed);
      this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
      return this.foodUnitsDetailed.slice();
    });
  }

  getFoodUnitsDetailed() {
    let theKey = JSON.stringify(localStorage.getItem('selectedFridgeKey'));
    theKey = theKey.substring(1, theKey.length - 1);
    // console.log(theKey);

    this.db.list('fridges/' + theKey + '/fridgeContainer')
      .valueChanges()
      .subscribe(async (res) => {
          // await delay(5000);
          // console.log('unu: ' + JSON.parse(JSON.stringify(res)));
          this.foodUnitsDetailed = JSON.parse(JSON.stringify(res));
          this.delay(500);
      });
  }

  getFoodUnitDetailed(index: number) {
    return this.foodUnitsDetailed[index];
  }
  addFoodUnitDetailed(foodUnitDetailed: FoodUnitDetailed) {
    // console.log(foodUnitDetailed);
    let theKey = JSON.stringify(localStorage.getItem('selectedFridgeKey'));
    theKey = theKey.substring(1, theKey.length - 1);
    const items = this.db.list('fridges/' + theKey + '/fridgeContainer');
    items.push(foodUnitDetailed);
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
  addAllFoodUnitDetailed(foodUnitDetailed: FoodUnitDetailed[]) {
    for (const f of foodUnitDetailed) {
      this.addFoodUnitDetailed(f);
    }
  }
  updateFoodUnitDetailed(index: number, newFoodUnitDetailed: FoodUnitDetailed) {
    let theKey = JSON.stringify(localStorage.getItem('selectedFridgeKey'));
    theKey = theKey.substring(1, theKey.length - 1);

    const ref = firebase.database().ref('fridges/' + theKey + '/fridgeContainer');
    ref.orderByChild('name').
    equalTo(this.foodUnitsDetailed[index].name).
    on('child_added', (snapshot) => {
      if (JSON.stringify(snapshot.toJSON()) === JSON.stringify(this.foodUnitsDetailed[index]) ) {
        // console.log('da');
        // console.log(snapshot.key);
        // tslint:disable-next-line:no-shadowed-variable
        const adaNameRef = firebase.database().ref('fridges/' + theKey + '/fridgeContainer/' + snapshot.key + '/');
        adaNameRef.update({
          name: newFoodUnitDetailed.name,
          expirationDate: newFoodUnitDetailed.expirationDate,
          amountSize: newFoodUnitDetailed.amountSize,
          amount: newFoodUnitDetailed.amount,
          storeLocation: newFoodUnitDetailed.storeLocation,
        });
      }
    });

    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }

  deleteFoodUnitDetailed(index: number) {
    let theKey = JSON.stringify(localStorage.getItem('selectedFridgeKey'));
    theKey = theKey.substring(1, theKey.length - 1);

    const ref = firebase.database().ref('fridges/' + theKey + '/fridgeContainer');
    ref.orderByChild('name').
    equalTo(this.foodUnitsDetailed[index].name).
    on('child_added', (snapshot) => {
      if (JSON.stringify(snapshot.toJSON()) === JSON.stringify(this.foodUnitsDetailed[index]) ) {
        // console.log('da');
        // console.log(snapshot.key);
        firebase.database().ref().child('fridges/' + theKey + '/fridgeContainer/' + snapshot.key + '/').remove();
      }
    });
    this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
  }
  deleteAllExpiredFoodUnitsDetailed() {
    for (const item of this.foodUnitsDetailed) {
      if (this.checkIfExpired(item)) {
        this.deleteFoodUnitDetailed(this.foodUnitsDetailed.indexOf(item));
        this.foodUnitsDetailedChanged.emit(this.foodUnitsDetailed.slice());
      }
    }
  }
  checkIfExpired(currentFoodUnitDetailed: FoodUnitDetailed) {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const currentYear: number = +currentDate.slice(0, 4);
    const currentMonth: number = +currentDate.slice(5, 7);
    const currentDay: number = +currentDate.slice(8, 10);
    const expirationDate: number[] = currentFoodUnitDetailed.expirationDate.split('/', 3).map(Number);
    const expirationMonth: number = expirationDate[0];
    const expirationDay: number = expirationDate[1];
    const expirationYear: number = expirationDate[2];
    if (currentYear > expirationYear) {
      return true;
    } else if (currentYear === expirationYear && currentMonth > expirationMonth) {
      return true;
    } else if (currentYear === expirationYear && currentMonth === expirationMonth && currentDay > expirationDay) {
      return true;
    } else {
      return false;
    }
  }
  getColor(currentFoodUnitDetailed: FoodUnitDetailed) {
    this.isExpired = this.checkIfExpired(currentFoodUnitDetailed);
    return this.isExpired === false ? 'darkgreen' : 'darkred';
  }
}
