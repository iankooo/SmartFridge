import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from '../../menu-item.model';
import {MenuService} from '../../menu.service';
import {FoodUnit} from '../../../shared/foodUnit.model';
import {FoodUnitService} from '../../../../foodUnit.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: MenuItem;
  isHover = false;
  constructor(private menuItemService: MenuService, private  foodUnitService: FoodUnitService) { }

  ngOnInit(): void {
  }
  onSelected() {
    this.menuItemService.menuItemSelected.emit(this.menuItem);
    this.isHover = !this.isHover;
  }
  openDetailSection(foodUnit: FoodUnit) {
    this.foodUnitService.foodUnitSelected.emit(foodUnit);
  }
}
