import { Injectable } from "@angular/core";
import { Paciente } from "./paciente";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PacienteService {
  constructor(private _angularFireDatabase: AngularFireDatabase) {}

  insert(paciente: Paciente) {
    this._angularFireDatabase
      .list("paciente")
      .push(paciente)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(paciente: Paciente, key: string) {
    this._angularFireDatabase.list("paciente").update(key, paciente);
  }

  getAll() {
    return this._angularFireDatabase
      .list("paciente")
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
    this._angularFireDatabase.object(`paciente/${key}`).remove();
  }
}
