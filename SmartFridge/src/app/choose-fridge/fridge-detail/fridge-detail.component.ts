import {Component, Input, OnInit} from '@angular/core';
import { Fridge } from '../fridge.model';
import {Router} from '@angular/router';
import {AngularFireDatabase, snapshotChanges} from '@angular/fire/database';
import * as firebase from 'firebase';


@Component({
  selector: 'app-fridge-detail',
  templateUrl: './fridge-detail.component.html',
  styleUrls: ['./fridge-detail.component.css']
})
export class FridgeDetailComponent implements OnInit {
  @Input() fridge: Fridge;

  constructor( private routes: Router, private db: AngularFireDatabase ) {
  }

ngOnInit(): void {
  }



continueWithThisFridge() {
    console.log(this.fridge);
  }

  deleteThisFridge() {
    const ref = firebase.database().ref('fridges');
    ref.orderByChild('name').
    equalTo(this.fridge.name).
    on('child_added', (snapshot) => {
      firebase.database().ref().child('/fridges/' + snapshot.key + '/').remove();
    });
    alert('That fridge was deleted!');
    window.location.reload();
    // this.routes.navigate(['/chooseFridge']);
  }
}
