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

  updateEvolucao(keyPaciente: string, key: string, evolucao: any) {
    this._angularFireDatabase
      .list(`paciente/${keyPaciente}/evolucoes`)
      .update(key, evolucao);
  }

  updateAvaliacao(keyPaciente: string, key: string, avaliacao: any) {
    console.log(avaliacao);
    this._angularFireDatabase
      .list(`paciente/${keyPaciente}/avaliacoes`)
      .update(key, avaliacao);
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

  get(key: string) {
    return this._angularFireDatabase
      .list("paciente", ref => ref.orderByKey().equalTo(key))
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
