import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { PacienteDataService } from "app/service/paciente-data.service";
import { Paciente } from "app/service/paciente";
import { EstagiarioService } from "app/service/estagiario.service";
import { Observable } from "rxjs";

import "rxjs/add/observable/of";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";

import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
  selector: "app-tables",
  templateUrl: "./paciente.component.html",
  styleUrls: ["./paciente.component.css"]
})
export class PacienteComponent implements OnInit {
  paciente: Paciente;
  pacientes: Observable<any>;
  estagiarios: any;
  listaResponsaveis: any[] = [];
  key: string = "";
  campos: boolean = true;
  sucesso: boolean = false;
  popoverTitle = "GClin - Faculdade Guairacá";
  popoverMessage = "Deseja realmente exlcuir?";
  popoverMessage2 = "Deseja realmente editar?";
  dropdownList = [];
  selectedItems = [];
  responsaveis_fim: any = [];
  dropdownSettings = {};
  constructor(
    private _pacienteDataService: PacienteDataService,
    private _pacienteService: PacienteService,
    private _estagiarioService: EstagiarioService,
    private _router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit() {
    this.paciente = new Paciente();
    this.pacientes = this._pacienteService.getAll();
    this.estagiarios = this._estagiarioService.getAll();

    this._pacienteDataService.pacienteAtual.subscribe(data => {
      if (data.paciente && data.key) {
        this.paciente = new Paciente();
        this.paciente.nome = data.paciente.nome;
        this.paciente.cpf = data.paciente.cpf;
        this.paciente.rg = data.paciente.rg;
        this.paciente.nascimento = data.paciente.nascimento;
        this.paciente.sus = data.paciente.sus;
        this.paciente.pai = data.paciente.pai;
        this.paciente.mae = data.paciente.mae;
        this.paciente.cep = data.paciente.cep;
        this.paciente.rua = data.paciente.rua;
        this.paciente.numero = data.paciente.numero;
        this.paciente.cidade = data.paciente.cidade;
        this.paciente.bairro = data.paciente.bairro;
        this.paciente.contato = data.paciente.contato;
        this.paciente.responsaveis = data.paciente.responsaveis;

        this.key = data.key;
      }
    });

    //dropdown

    this.estagiarios.forEach(x => {
      console.log(x);
      this.dropdownList = x;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "keyAuth",
      textField: "nome",
      selectAllText: "Selecionar Todos",
      unSelectAllText: "Remover Seleção",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  async onSubmit() {
    if (this.paciente.contato) {
      this.paciente.contato =
        "(" +
        this.paciente.contato.substring(0, 2) +
        ") " +
        this.paciente.contato.substring(2);
    }

    let paciente: Paciente = { ...this.paciente };

    if (
      this.paciente.nome != null &&
      this.paciente.contato != null &&
      this.paciente.responsaveis != null &&
      this.paciente.bairro != null &&
      this.paciente.cep != null &&
      this.paciente.cidade != null &&
      this.paciente.mae != null &&
      this.paciente.rua != null &&
      this.paciente.pai != null &&
      this.paciente.cpf != null &&
      this.paciente.sus != null &&
      this.paciente.rg != null &&
      this.paciente.nascimento != null &&
      this.paciente.numero != null
    ) {
      if (this.key) {
        this._pacienteService.update(paciente, this.key);
      } else {
        this._pacienteService.insert(paciente);
      }
      this.sucesso = true;
      await this.delay(3000);
      this.sucesso = false;
      this.paciente = new Paciente();
      this.key = null;
    } else {
      this.campos = false;
      await this.delay(3000);
      this.campos = true;
    }
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
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

  irParaAvaliacao(key: string) {
    this._router.navigate(["/avaliacao/" + key]);
  }

  converte(texto: any) {
    const [keyAuth, nome] = texto.split(" _ ");
    return nome;
  }

  converte2(resp: any) {
    resp.forEach(x => {
      this.responsaveis_fim.push(x.keyAuth + " _ " + x.nome);
    });
    return this.responsaveis_fim;
  }

  buscaCep(cep: string) {
    console.log("teste");
    if (cep !== " ") {
      const validaCep = /^[0-9]{8}$/;
      if (validaCep.test(cep)) {
        this._http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(dados => {
          let dadosQuebrados = JSON.parse(JSON.stringify(dados));
          console.log(dadosQuebrados.logradouro);
          this.paciente.rua = dadosQuebrados.logradouro;
          this.paciente.bairro = dadosQuebrados.bairro;
          this.paciente.cidade = dadosQuebrados.localidade;
        });
      }
    }
  }
}
