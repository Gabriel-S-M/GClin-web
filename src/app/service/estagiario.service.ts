import { Injectable } from "@angular/core";
import { Estagiario } from "./estagiario";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class EstagiarioService {
  user: any;
  constructor(
    private _angularFireDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  insert(estagiario: Estagiario) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(estagiario.email, estagiario.senha)
      .then(c => {
        estagiario.keyAuth = this.afAuth.auth.currentUser.uid;
        this._angularFireDatabase
          .list("estagiarios")
          .push(estagiario)
          .then((result: any) => {
            // console.log(result.key);
          });
      })
      .catch(() => {
        alert("Esse email já foi utilizado!");
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

  buscarTodos(email: string) {
    return this._angularFireDatabase
      .list("estagiarios", ref => ref.orderByChild("supervisor").equalTo(email))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
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
