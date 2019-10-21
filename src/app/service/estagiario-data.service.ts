import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Estagiario } from "./estagiario";

@Injectable({
  providedIn: "root"
})
export class EstagiarioDataService {
  constructor() {}

  private estagiarioSource = new BehaviorSubject({ estagiario: null, key: "" });
  estagiarioAtual = this.estagiarioSource.asObservable();

  obtemEstagiario(estagiario: Estagiario, key: string) {
    this.estagiarioSource.next({ estagiario: estagiario, key: key });
  }
}
