import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class RegistroService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }
  registrar(email: string, senha: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha);
  }
}
