import { Injectable } from "@angular/core";
import { Estagiario } from "./estagiario";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class EstagiarioService {
  constructor(private _angularFireDatabase: AngularFireDatabase) {}

  insert(estagiario: Estagiario) {
    this._angularFireDatabase
      .list("estagiarios")
      .push(estagiario)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(estagiario: Estagiario, key: string) {
    this._angularFireDatabase.list("estagiarios").update(key, estagiario);
  }

  getAll() {
    return this._angularFireDatabase
      .list("estagiarios")
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

  get(key: String) {
    return this._angularFireDatabase
      .object("estagiarios/" + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.payload.key, ...c.payload.val() };
      });
  }

  delete(key: string) {
    this._angularFireDatabase.object(`estagiarios/${key}`).remove();
  }
}
