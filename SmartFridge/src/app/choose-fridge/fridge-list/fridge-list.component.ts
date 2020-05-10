import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Fridge } from '../fridge.model';
import {FridgeStorageService} from '../../shared/fridge-storage.service';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Global} from '../../shared/global';
import {FridgeDetailComponent} from '../fridge-detail/fridge-detail.component';

@Component({
  selector: 'app-fridge-list',
  templateUrl: './fridge-list.component.html',
  styleUrls: ['./fridge-list.component.css']
})
export class FridgeListComponent implements OnInit {
  @Output() fridgeWasSelected = new EventEmitter<Fridge>();
  @Output() optionSelected = new EventEmitter<string>();
  fridges: Fridge[] = [];
  itExistsOrNot = true;
  itWasFoundedOrNot = false;

  constructor(private fridgeStorageService: FridgeStorageService,
              private db: AngularFireDatabase,
              private global: Global,
              private fridgeDetail: FridgeDetailComponent
  ) {}

  ngOnInit(): void {
  }

  onFridgeSelected(fridge: Fridge) {
    this.fridgeWasSelected.emit(fridge);
    this.optionSelected.emit('list');
    // console.log('this ' + fridge.owner + '  ' + fridge.name + ' was selected');
  }

  searchForAFridge(fridge: Fridge) {
    this.db.list('/fridges')
      .valueChanges()
      .subscribe(res =>
        res.forEach( (r) => {
          JSON.parse(JSON.stringify(r));
          // @ts-ignore
          if (r.owner === fridge.owner && r.name === fridge.name) {
            this.fridgeDetail.fridge = fridge;
            this.itWasFoundedOrNot = true;
            // this.isFounded();
            alert('It was founded!');
            this.fridgeDetail.continueWithThisFridge();
          }
        })
      );
  }

  onSearchSelected() {
    this.optionSelected.emit('search');
  }

  onNewFridgeSelected() {
    this.optionSelected.emit('new');
  }

  showMyFridges() {
    // best code of my life
    // @ts-ignore
    this.db.list('/fridges')
      .valueChanges()
      .subscribe(res =>
        res.forEach( (r) => {
          JSON.parse(JSON.stringify(r));

          for (const val of this.fridges) {
            // @ts-ignore
            if (r.name === val.name) {
              this.itExistsOrNot = false;
            }
          }
          // @ts-ignore
          if (r.owner === this.global.userEmail && this.itExistsOrNot ) {
            // @ts-ignore
            this.fridges.push(new Fridge(r.name, r.owner));
          }
          this.itExistsOrNot = true;
        })
      );
  }
}
