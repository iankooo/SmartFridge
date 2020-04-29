import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Fridge} from '../../fridge.model';

@Component({
  selector: 'app-fridge-item',
  templateUrl: './fridge-item.component.html',
  styleUrls: ['./fridge-item.component.css']
})
export class FridgeItemComponent implements OnInit {
  @Input() fridge: Fridge;
  @Output() fridgeSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.fridgeSelected.emit();
  }

}
