import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FoodUnit} from '../../shared/foodUnit.model';
import {FoodUnitService} from '../../../foodUnit.service';
import {FoodUnitDetailed} from '../../shared/foodUnitDetailed.model';
import {FormBuilder, FormControl, FormsModule, NgForm} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';

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
  quantitySizeInputRef = '';
  storeLocation;
  registerForm: FormsModule;
  dateChanged = '';
  aux = '';
  textShow = false;

  quantity;
  quantitySize;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild('search') searchElementRef: ElementRef;
  constructor(
    private foodUnitService: FoodUnitService,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // set google maps defaults
    this.zoom = 6;
    this.latitude = 45.792778;
    this.longitude = 24.151944;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode', 'establishment']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.setStoreLocation(this.searchElementRef.nativeElement.value);
        });
      });
    });
    this.registerForm = this.formBuilder.group({
      expirationDate: ''
    });
    this.foodUnitService.foodUnitSelected
      .subscribe(
        () => {
          this.quantitySizeInputRef = '';
          this.dateChanged = '';
          this.aux = '';
          this.textShow = false;
          this.storeLocation = '';
        }
      );
  }
  onAdd(form: NgForm) {
    const value = form.value;
    this.quantity = value.quantity;
    this.quantitySize = value.quantitySize;
  }
  onAddToFridge(form: NgForm) {
    if (this.dateChanged === '') {
      this.foodUnitService.addFoodUnitToFridgeList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantity,
          this.quantitySize,
          this.expirationDate,
          this.storeLocation
        ));
    } else {
      this.foodUnitService.addFoodUnitToFridgeList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantity,
          this.quantitySize,
          this.dateChanged,
          this.storeLocation
        ));
    }
    form.reset();
    this.searchControl.reset();
  }
  onAddToWishList(form: NgForm) {
    if (this.dateChanged === '') {
      this.foodUnitService.addFoodUnitToWishList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantity,
          this.quantitySize,
          this.expirationDate,
          this.storeLocation
        ));
    } else {
      this.foodUnitService.addFoodUnitToWishList(
        new FoodUnitDetailed(
          this.foodUnit,
          this.foodUnit.name,
          this.quantity,
          this.quantitySize,
          this.dateChanged,
          this.storeLocation
        ));
    }
    form.reset();
    this.searchControl.reset();
  }
  setValueForAux(event: any) {
    this.aux = event.target.value;
  }
  setStoreLocation(storeName: string) {
    this.storeLocation = storeName;
  }
  onChangeExpirationDate() {
    const year: number = +this.aux.slice(0, 4);
    const month: number = +this.aux.slice(5, 7);
    const day: number = +this.aux.slice(8, 10);
    const expirationDate: number[] = this.expirationDate.split('-', 3).map(Number);
    if (expirationDate[0] < year || expirationDate[1] < month || expirationDate[2] < day) {
      if (month < 10 && day < 10) {
        this.dateChanged = year + '-0' + month + '-0' + day;
      } else if (month < 10) {
        this.dateChanged = year + '-0' + month + '-' + day;
      } else if (day < 10) {
        this.dateChanged = year + '-' + month + '-0' + day;
      } else {
        this.dateChanged = year + '-' + month + '-' + day;
      }
      this.textShow = true;
    }
  }
  closeDetailedSection() {
    this.isOff.emit(false);
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
