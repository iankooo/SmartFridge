import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Fridge } from '../fridge.model';
import {FridgeStorageService} from '../../shared/fridge-storage.service';

@Component({
  selector: 'app-fridge-list',
  templateUrl: './fridge-list.component.html',
  styleUrls: ['./fridge-list.component.css']
})
export class FridgeListComponent implements OnInit {
  @Output() fridgeWasSelected = new EventEmitter<Fridge>();
  @Output() optionSelected = new EventEmitter<string>();

  fridges: Fridge[] = [
    new Fridge('A test fridge', 'edgarnemeth@gmail.com'),
    new Fridge('Another One', 'edgarnemeth@gmail.com')
  ];

  constructor(private fridgeStorageService: FridgeStorageService) { }

  ngOnInit(): void {
  }

  onFridgeSelected(fridge: Fridge) {
    this.fridgeWasSelected.emit(fridge);
    this.optionSelected.emit('list');
    //this.fridgeStorageService.storeFridges(fridge);
  }


  onSearchSelected() {
    this.optionSelected.emit('search');
  }

  onNewFridgeSelected() {
    this.optionSelected.emit('new');
  }

  // onSaveFridge() {
  //   this.fridgeStorageService.storeFridges(this.fridge);
  // }


}
