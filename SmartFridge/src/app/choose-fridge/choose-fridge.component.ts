import { Component, OnInit } from '@angular/core';
import {Fridge} from './fridge.model';

@Component({
  selector: 'app-choose-fridge',
  templateUrl: './choose-fridge.component.html',
  styleUrls: ['./choose-fridge.component.css']
})
export class ChooseFridgeComponent implements OnInit {
  selectedFridge: Fridge;
  loadedOption: string;

  constructor() { }

  ngOnInit(): void {
  }


}
