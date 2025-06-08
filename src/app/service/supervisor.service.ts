import { Injectable } from "@angular/core";
import { Supervisor } from "./supervisor";
import { map } from 'rxjs/operators';
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Database, getDatabase, ref, push, update, remove, get, query, orderByKey, equalTo } from "@angular/fire/database";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SupervisorService {
  private db: Database;

  constructor(
    private auth: Auth
  ) {
    this.db = getDatabase();
  }

  insert(supervisor: Supervisor) {
    const supervisorRef = ref(this.db, "supervisor");
    return from(
      push(supervisorRef, supervisor).catch(() => {
        alert("Esse email já foi utilizado!");
      })
    );
  }

  update(supervisor: Supervisor, key: string) {
    const supervisorRef = ref(this.db, `supervisor/${key}`);
    return from(update(supervisorRef, supervisor as any));
  }

  getAll(): Observable<any[]> {
    const supervisorRef = ref(this.db, "supervisor");
    return from(get(supervisorRef)).pipe(
      map(snapshot => {
        const data = snapshot.val();
        return data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      })
    );
  }

  get(key: string): Observable<any[]> {
    const supervisorQuery = query(
      ref(this.db, "supervisor"),
      orderByKey(),
      equalTo(key)
    );
    return from(get(supervisorQuery)).pipe(
      map(snapshot => {
        const data = snapshot.val();
        return data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      })
    );
  }

  delete(key: string) {
    const supervisorRef = ref(this.db, `supervisor/${key}`);
    return from(remove(supervisorRef));
  }
}
