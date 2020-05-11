import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FoodUnit} from '../../shared/foodUnit.model';
import {FoodUnitService} from '../../../foodUnit.service';
import {FoodUnitDetailed} from '../../shared/foodUnitDetailed.model';
import {FormBuilder, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {
  @Input() isOn: boolean;
  @Output() isOff = new EventEmitter<boolean>();
  @Input() foodUnit: FoodUnit;
  @Input() expirationDate: string;
  @ViewChild('quantityInput') quantityInputRef: ElementRef;
  quantitySizeInputRef = '';
  registerForm: FormsModule;
  dateChanged = '';
  aux = '';
  textShow = false;
  constructor(
    private foodUnitService: FoodUnitService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      expirationDate: ''
    });
    this.foodUnitService.foodUnitSelected
      .subscribe(
        () => {
          this.quantityInputRef.nativeElement.value = 1;
          this.quantitySizeInputRef = '';
          this.dateChanged = '';
          this.aux = '';
          this.textShow = false;
        }
      );
  }
  onAddToFridge() {
    if (this.dateChanged === '') {
      this.foodUnitService.addFoodUnitToFridgeList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantityInputRef.nativeElement.value,
          this.quantitySizeInputRef,
          this.expirationDate
        ));
    } else {
      this.foodUnitService.addFoodUnitToFridgeList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantityInputRef.nativeElement.value,
          this.quantitySizeInputRef,
          this.dateChanged
        ));
    }
  }
  onAddToWishList() {
    if (this.dateChanged === '') {
      this.foodUnitService.addFoodUnitToWishList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantityInputRef.nativeElement.value,
          this.quantitySizeInputRef,
          this.expirationDate
        ));
    } else {
      this.foodUnitService.addFoodUnitToWishList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantityInputRef.nativeElement.value,
          this.quantitySizeInputRef,
          this.dateChanged
        ));
    }
  }
  onSelectQuantitySizeChange(event: any) {
    this.quantitySizeInputRef  = event.target.value;
  }
  setValueForAux(event: any) {
    this.aux = event.target.value;
  }
  onChangeExpirationDate() {
    const year: number = +this.aux.slice(0, 4);
    const month: number = +this.aux.slice(5, 7);
    const day: number = +this.aux.slice(8, 10);
    const expirationDate: number[] = this.expirationDate.split('/', 3).map(Number);
    if (expirationDate[0] < month || expirationDate[1] < day || expirationDate[2] < year) {
      this.dateChanged = month + '/' + day + '/' + year;
      this.textShow = true;
    }
  }
  closeDetailedSection() {
    this.isOff.emit(false);
  }
}
