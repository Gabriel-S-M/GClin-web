import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Supervisor } from "./supervisor";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: "root"
})
export class SupervisorService {
  constructor(
    private _angularFireDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  insert(supervisor: Supervisor) {
    this._angularFireDatabase
      .list("supervisor")
      .push(supervisor)
      .then((result: any) => {
        // console.log(result.key);
      })

      .catch(() => {
        alert("Esse email já foi utilizado!");
      });
  }

  update(supervisor: Supervisor, key: string) {
    this._angularFireDatabase.list("supervisor").update(key, supervisor);
  }

  getAll() {
    return this._angularFireDatabase
      .list("supervisor")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({
            key: data.payload.key,
            ...data.payload.val()
          }));
        })
      );
  }

  get(key: string) {
    return this._angularFireDatabase
      .list("supervisor", ref => ref.orderByKey().equalTo(key))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({
            key: data.payload.key,
            ...data.payload.val()
          }));
        })
      );
  }

  delete(key: string) {
    this._angularFireDatabase.object(`supervisor/${key}`).remove();
  }
}
