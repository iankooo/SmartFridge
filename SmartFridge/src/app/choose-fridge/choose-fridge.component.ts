import {Component, NgModule, OnInit} from '@angular/core';
import {Fridge} from './fridge.model';
import {FridgeStorageService} from '../shared/fridge-storage.service';
import { NgForm} from '@angular/forms';
import {AuthService} from '../reg-log/reg-log.service';
import {Router} from '@angular/router';
import {Global} from '../shared/global';
import {FridgeListComponent} from './fridge-list/fridge-list.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {FridgeDetailComponent} from './fridge-detail/fridge-detail.component';
import * as firebase from 'firebase';


@Component({
  selector: 'app-choose-fridge',
  templateUrl: './choose-fridge.component.html',
  styleUrls: ['./choose-fridge.component.css']
})


export class ChooseFridgeComponent implements OnInit {
  selectedFridge: Fridge;
  public loadedOption: string;

  constructor(
    private fridgeStorageService: FridgeStorageService,
    private global: Global,
    private fridgeList: FridgeListComponent,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private fridgeDetail: FridgeDetailComponent,
    private routes: Router) {
    this.loadedOption = 'list';
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.loadedOption = 'list';
  }

  saveThisFridge(form: NgForm) {
    const name = form.value.yourFridgeName;
    const owner = this.global.userEmail;
    this.fridgeStorageService.storeFridges(new Fridge(name, owner));
    form.reset();
  }

  searchForAFridge(form: NgForm) {
    if (this.loadedOption === 'search') {
      const name = form.value.fridgeName;
      const owner = form.value.owner;
      const fridge = new Fridge(name, owner);
      // console.log(fridge);
      this.continue(fridge);
      form.reset();
    }
  }

  continue(fridge: Fridge) {
    const ref = firebase.database().ref('fridges');
    ref.orderByChild('name').
      equalTo(fridge.name).
      on('child_added', (snapshot) => {
        if (JSON.parse(JSON.stringify(snapshot.toJSON())).owner ===  fridge.owner) {
          this.routes.navigate(['/main']);
          localStorage.setItem('selectedFridgeKey', snapshot.key);
        }
      });
  }

}
