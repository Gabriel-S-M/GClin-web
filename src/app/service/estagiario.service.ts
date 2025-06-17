import { Injectable } from "@angular/core";
import { Estagiario } from "./estagiario";
import {
  Database,
  getDatabase,
  ref,
  push,
  update,
  remove,
  child,
  get,
  query,
  orderByChild,
  equalTo,
  onValue
} from "@angular/fire/database";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EstagiarioService {
  private db: Database;

  constructor(private auth: Auth) {
    this.db = getDatabase();
  }

  insert(estagiario: Estagiario) {
    return from(
      createUserWithEmailAndPassword(this.auth, estagiario.email, estagiario.senha)
        .then(c => {
          const uid = c.user?.uid;
          if (uid) {
            estagiario.keyAuth = uid;
            const estagiariosRef = ref(this.db, "estagiarios");
            return push(estagiariosRef, estagiario);
          }
        })
        .catch(() => {
          alert("Esse email já foi utilizado!");
        })
    );
  }

  update(estagiario: Estagiario, key: string) {
    const estagiarioRef = ref(this.db, `estagiarios/${key}`);
    return from(update(estagiarioRef, estagiario as any));
  }

  // 🔥 Atualização em tempo real
  getAll(): Observable<any[]> {
    const estagiariosRef = ref(this.db, "estagiarios");
    return new Observable(observer => {
      const unsubscribe = onValue(estagiariosRef, snapshot => {
        const data = snapshot.val();
        const estagiarios = data
          ? Object.keys(data).map(key => ({ key, ...data[key] }))
          : [];
        observer.next(estagiarios);
      });

      return { unsubscribe };
    });
  }

  buscarTodos(email: string): Observable<any[]> {
    const estagiariosQuery = query(
      ref(this.db, "estagiarios"),
      orderByChild("supervisor"),
      equalTo(email)
    );
    return from(get(estagiariosQuery)).pipe(
      map(snapshot => {
        const data = snapshot.val();
        return data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      })
    );
  }

  get(key: string): Observable<any> {
    const estagiarioRef = ref(this.db, `estagiarios/${key}`);
    return from(get(estagiarioRef)).pipe(
      map(snapshot => ({
        key: snapshot.key,
        ...snapshot.val()
      }))
    );
  }

  delete(key: string) {
    const estagiarioRef = ref(this.db, `estagiarios/${key}`);
    return from(remove(estagiarioRef));
  }
}
