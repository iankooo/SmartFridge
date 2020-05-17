import {Injectable} from '@angular/core';
import {Fridge} from '../choose-fridge/fridge.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({providedIn: 'root'})

export class FridgeStorageService {
  private db: AngularFireDatabase;
  private stored = false;

  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  async delay(ms: number, fridge: Fridge) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
      // console.log(this.stored);
      this.storeFridges2(fridge);
    });
  }

  storeFridges2(fridge: Fridge) {
      if (fridge.name === null || fridge.name === '') {
        alert('The name must contain something');
      } else {
        if (this.stored === true) {
                alert('This fridge already exists in database, choose another name, please!');
          } else {
                const items = this.db.list('fridges');
                items.push({
                  name: fridge.name,
                  owner: fridge.owner,
                  wishList: fridge.wishList,
                  fridgeContainer: fridge.fridgeContainer
                });
          }
      }
    }

  storeFridges(fridge: Fridge) {
    this.stored = false;
    this.db.list('fridges')
      .valueChanges()
      .subscribe(async (res) => {
        res.forEach((r) => {
            if (JSON.parse(JSON.stringify(r)).name === fridge.name) {
              this.stored = true;
            }
        });
      });
    this.delay(100, fridge);
  }
}

