import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from '../../menu-item.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: MenuItem;
  isHover = false;
  @Output() menuItemSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onSelected() {
    this.menuItemSelected.emit();
    this.isHover = !this.isHover;
  }

}
