import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Fridge} from '../choose-fridge/fridge.model';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';


@Injectable({providedIn: 'root'})

export class FridgeStorageService {
  private db: AngularFireDatabase;
  private stored = false;
  // fridges: Fridge[] = [];

 constructor(db: AngularFireDatabase) {
   this.db = db;
 }




  existsInDataBase(fridge: Fridge) {
    const ref = firebase.database().ref('fridges');
    ref.orderByChild('name').
    equalTo(fridge.name).
    on('child_added', (snapshot) =>
      this.stored = true
    );
  }


  storeFridges(fridge: Fridge) {
    this.stored = false;
    this.existsInDataBase(fridge);
    if (fridge.name === null || fridge.name === '') {
      alert('The name must contain something');
    } else {

        // @ts-ignore
      if (this.stored === true) {
              alert('This fridge already exists in database, choose another name, please!');
              this.stored = false;
        } else {
              const items = this.db.list('fridges');
              items.push({
                name: fridge.name,
                owner: fridge.owner
              });
        }

    }
  }

}


// priceless code

// this shows me every fridge
// db.list('/fridges')
//   .valueChanges()
//   // .pipe(map( res => {
//   //   // do some calculations here if you want to
//   //   return res.map(eachlLabel => eachlLabel + ' Hello World');
//   // }))
//   .subscribe(res =>
//     res.forEach( (r) => {
//       // console.log(JSON.parse(r));
//       // console.log(JSON.stringify(r));
//       // const newData = r.data.userList;
//           JSON.parse(JSON.stringify(r));
//         // this.fridges.push( new Fridge(r.name, r.owner));
//           // @ts-ignore
//           // console.log(new Fridge(r.name, r.owner));
//           // @ts-ignore
//           this.fridges.push( new Fridge(r.name, r.owner));
//     })
//     // this.fridges.push( new Fridge(res.val().name, res.val().owner));
//  );

// priceless code end

// console.log(this.fridges);

// // this shit works too
// const database = firebase.database();
// const ref = database.ref('fridges').orderByChild('owner').equalTo(this.global.userEmail);
// ref.on('value', snapshot => {
//   if (snapshot.exists()) {
//     let name = snapshot.val();
//     name = Object.values(name);
//     name = name[0].name;
//     console.log('User email : ' + 'edgarnemeth@gmail.com' + ' User name: ' + name );
//   } else {
//     console.log('There is no user who has email like ' + 'edgarnemeth@gmail.com');
//   }
// });

// // extract data by key
// const ref = firebase.database().ref('fridges');
// ref.orderByChild('owner').equalTo(this.global.userEmail).on('child_added',
//   (snapshot) =>
//   console.log(snapshot.key)
// );

// firebase.database().ref('/tests')
//   .orderByChild('owner').equalTo(this.global.userEmail)
//   .on('value', (data: DataSnapshot) => {
//     data.forEach((child: DataSnapshot) => {
//       console.log(child.key, child.val());
//     });
//   });


// extract data by key new try

// const ref = firebase.database().ref('fridges');
// ref.orderByChild('owner').equalTo(this.global.userEmail).on('child_added',
//   (snapshot) => {
//     // console.log(snapshot.val())
//     snapshot.forEach( (fridge) => {
//       console.log(fridge.val());
//       // this.fridges.push( new Fridge(fridge.val().name, fridge.val().owner));
//     });
//   });

// console.log(this.fridges);


// // something good but not
// const ref = firebase.database().
// ref('fridges').
// orderByChild('owner').
// equalTo(this.global.userEmail);
//
// ref.once('value').then( (snapshot) => {
//   snapshot.forEach( (child) => {
//     const key = child.key;
//     const partnerName = child.val().name;
//     console.log(key + partnerName);
//   });
// });


// const ref = firebase.database().ref('fridges');
// ref.orderByChild('owner').equalTo(this.global.userEmail);


// this.fridgesRef =  db.list('/diagnostics', (ref) => ref.orderByChild('owner').equalTo(this.global.userEmail));
//
// console.log(this.fridgesRef);

//
// const dbRef = firebase.database().ref('fridges');
//


// this.fridges = this.db.list('fridges').valueChanges();
// this.fridges = this.fridgeStorageService.showFridges();
// console.log(this.db.list('fridges').valueChanges());
// this.items = this.db.list('/projects').valueChanges().subscribe(items => {
// console.log(items);
// });



