import {Component, Input, OnInit} from '@angular/core';
import { Fridge } from '../fridge.model';

@Component({
  selector: 'app-fridge-detail',
  templateUrl: './fridge-detail.component.html',
  styleUrls: ['./fridge-detail.component.css']
})
export class FridgeDetailComponent implements OnInit {
  @Input() fridge: Fridge;

  constructor() { }

  ngOnInit(): void {
  }

  continueWithThisFridge() {
    console.log(this.fridge);
    //this fridge details will be uploaded after this
  }


}
