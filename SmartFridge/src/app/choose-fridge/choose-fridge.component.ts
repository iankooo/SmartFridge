import {Component, NgModule, OnInit} from '@angular/core';
import {Fridge} from './fridge.model';
import {FridgeStorageService} from '../shared/fridge-storage.service';
import { NgForm} from '@angular/forms';
import {AuthService} from '../reg-log/reg-log.service';
import {HeaderComponent} from '../header/header.component';
import {Router} from '@angular/router';
import {Global} from '../shared/global';
import {FridgeListComponent} from './fridge-list/fridge-list.component';

@Component({
  selector: 'app-choose-fridge',
  templateUrl: './choose-fridge.component.html',
  styleUrls: ['./choose-fridge.component.css']
})


export class ChooseFridgeComponent implements OnInit {
  selectedFridge: Fridge;
  loadedOption: string;

  constructor(
    private fridgeStorageService: FridgeStorageService,
    private global: Global,
    private fridgeList: FridgeListComponent,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  saveThisFridge(form: NgForm) {

    const name = form.value.yourFridgeName;
    const owner = this.global.userEmail;

    this.fridgeList.fridges = [];

    this.fridgeStorageService.storeFridges(new Fridge(name, owner));

    form.reset();
  }

  searchForAFridge(form: NgForm) {

    const name = form.value.fridgeName;
    const owner = form.value.owner;

    this.fridgeList.fridges = [];

    this.fridgeList.searchForAFridge(new Fridge(name, owner));

    form.reset();
  }

}
