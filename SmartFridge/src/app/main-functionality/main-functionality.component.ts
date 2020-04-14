import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-functionality',
  templateUrl: './main-functionality.component.html',
  styleUrls: ['./main-functionality.component.css']
})
export class MainFunctionalityComponent implements OnInit {
  toggle = false;
  feature = 'fridge-container';
  constructor() { }

  ngOnInit(): void {
  }
  onNavigate() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.feature = 'wish-list';
    } else {
      this.feature = 'fridge-container';
    }
  }
}
