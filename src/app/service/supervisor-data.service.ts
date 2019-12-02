import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Supervisor } from "./supervisor";

@Injectable({
  providedIn: "root"
})
export class SupervisorDataService {
  constructor() {}

  private supervisorSource = new BehaviorSubject({ supervisor: null, key: "" });
  supervisorAtual = this.supervisorSource.asObservable();

  obtemSupervisor(supervisor: Supervisor, key: string) {
    this.supervisorSource.next({ supervisor: supervisor, key: key });
  }
}
