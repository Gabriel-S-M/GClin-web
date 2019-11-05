import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { PacienteDataService } from "app/service/paciente-data.service";
import { Paciente } from "app/service/paciente";
import { EstagiarioService } from "app/service/estagiario.service";
import { Observable } from "rxjs";
import { Estagiario } from "app/service/estagiario";

import "rxjs/add/observable/of";
import { Router } from "@angular/router";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
  styleUrls: ["./tables.component.css"]
})
export class TablesComponent implements OnInit {
  paciente: Paciente;
  pacientes: Observable<any>;
  estagiarios: Observable<any>;
  responsavel: Estagiario;
  key: string = "";
  constructor(
    private _pacienteDataService: PacienteDataService,
    private _pacienteService: PacienteService,
    private _estagiarioService: EstagiarioService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.paciente = new Paciente();
    this.pacientes = this._pacienteService.getAll();
    this.estagiarios = this._estagiarioService.getAll();

    this._pacienteDataService.pacienteAtual.subscribe(data => {
      if (data.paciente && data.key) {
        this.paciente = new Paciente();
        this.paciente.nome = data.paciente.nome;
        this.paciente.contato = data.paciente.contato;
        this.paciente.responsavel = data.paciente.responsavel;
        this.paciente.keyResponsavel = data.paciente.keyResponsavel;
        this.paciente.nomeResponsavel = data.paciente.nomeResponsavel;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    const paciente: Paciente = { ...this.paciente };

    if (this.paciente.responsavel) {
      const [keyAuth, nome] = this.paciente.responsavel.split(" _ ");
      paciente.keyResponsavel = keyAuth;
      paciente.nomeResponsavel = nome;
    }

    if (this.key) {
      this._pacienteService.update(paciente, this.key);
    } else {
      this._pacienteService.insert(paciente);
    }

    this.paciente = new Paciente();
    this.key = null;
  }

  delete(key: string) {
    this._pacienteService.delete(key);
  }

  edit(paciente: Paciente, key: string) {
    this._pacienteDataService.obtemPaciente(paciente, key);
  }

  irParaAcolhimento(key: string) {
    this._router.navigate(["/acolhimento/" + key]);
  }

  irParaEvolucao(key: string) {
    this._router.navigate(["/evolucao/" + key]);
  }
}
