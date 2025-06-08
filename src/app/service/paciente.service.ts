import { Injectable } from "@angular/core";
import { Paciente } from "./paciente";
import { Database, getDatabase, ref, push, update, remove, get, query, orderByKey, equalTo } from "@angular/fire/database";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PacienteService {
  private db: Database;

  constructor() {
    this.db = getDatabase(); 
  }

  insert(paciente: Paciente) {
    const pacienteRef = ref(this.db, "paciente");
    return from(
      push(pacienteRef, paciente).then(result => {
        console.log(result.key);
      })
    );
  }

  update(paciente: Paciente, key: string) {
    const pacienteRef = ref(this.db, `paciente/${key}`);
    return from(update(pacienteRef, paciente as any));
  }

  updateEvolucao(keyPaciente: string, key: string, evolucao: any) {
    const evolucaoRef = ref(this.db, `paciente/${keyPaciente}/evolucoes/${key}`);
    return from(update(evolucaoRef, evolucao));
  }

  updateAvaliacao(keyPaciente: string, key: string, avaliacao: any) {
    console.log("Antes do filtro:", avaliacao);

    // Remove propriedades com valores undefined
    const avaliacaoFiltrada = Object.fromEntries(
      Object.entries(avaliacao).filter(([_, v]) => v !== undefined)
    );

    console.log("Depois do filtro:", avaliacaoFiltrada);

    const avaliacaoRef = ref(this.db, `paciente/${keyPaciente}/avaliacoes/${key}`);
    return from(update(avaliacaoRef, avaliacaoFiltrada));
  }


  getAll(): Observable<any[]> {
    const pacienteRef = ref(this.db, "paciente");
    return from(get(pacienteRef)).pipe(
      map(snapshot => {
        const data = snapshot.val();
        return data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      })
    );
  }

  get(key: string): Observable<any[]> {
    const pacienteQuery = query(
      ref(this.db, "paciente"),
      orderByKey(),
      equalTo(key)
    );
    return from(get(pacienteQuery)).pipe(
      map(snapshot => {
        const data = snapshot.val();
        return data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      })
    );
  }

  delete(key: string) {
    const pacienteRef = ref(this.db, `paciente/${key}`);
    return from(remove(pacienteRef));
  }
}