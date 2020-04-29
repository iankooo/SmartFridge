import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Fridge} from '../choose-fridge/fridge.model';


@Injectable({providedIn: 'root'})
export class FridgeStorageService {
  constructor(private http: HttpClient) {}

  storeFridges(fridge: Fridge) {
    this.http
      .post(
        'https://smartfridge-73a88.firebaseio.com/fridges.json',
        fridge
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
