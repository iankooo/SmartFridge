import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Fridge } from '../fridge.model';
import {FridgeStorageService} from '../../shared/fridge-storage.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Global} from '../../shared/global';

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

  constructor(private fridgeStorageService: FridgeStorageService,
              private db: AngularFireDatabase,
              private global: Global) {
    this.optionSelected.emit('list');
  }

  ngOnInit(): void {
    this.showMyFridges();
    this.optionSelected.emit('list');
  }

  onFridgeSelected(fridge: Fridge) {
    this.fridgeWasSelected.emit(fridge);
    this.optionSelected.emit('list');
  }

  onSelected(value: string) {
    this.optionSelected.emit(value);
  }

  showMyFridges() {
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
