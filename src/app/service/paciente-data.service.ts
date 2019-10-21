import { Injectable } from "@angular/core";
import { Paciente } from "./paciente";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class PacienteDataService {
  constructor() {}

  private pacienteSource = new BehaviorSubject({ paciente: null, key: "" });
  pacienteAtual = this.pacienteSource.asObservable();

  obtemPaciente(paciente: Paciente, key: string) {
    this.pacienteSource.next({ paciente: paciente, key: key });
  }
}
