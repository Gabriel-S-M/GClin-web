import { Component, OnInit } from "@angular/core";
import { EstagiarioService } from "app/service/estagiario.service";
import { EstagiarioDataService } from "app/service/estagiario-data.service";
import { Estagiario } from "app/service/estagiario";
import { Observable } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  estagiario: Estagiario;
  estagiarios: Observable<any>;
  key: string = "";
  constructor(
    private _estagiarioService: EstagiarioService,
    private _estagiarioDataService: EstagiarioDataService
  ) {}

  ngOnInit() {
    this.estagiario = new Estagiario();
    this.estagiarios = this._estagiarioService.getAll();
    this._estagiarioDataService.estagiarioAtual.subscribe(data => {
      if (data.estagiario && data.key) {
        this.estagiario = new Estagiario();
        this.estagiario.email = data.estagiario.email;
        this.estagiario.senha = data.estagiario.senha;
        this.estagiario.ra = data.estagiario.ra;
        this.estagiario.contato = data.estagiario.contato;
        this.estagiario.nome = data.estagiario.nome;
        this.estagiario.curso = data.estagiario.curso;
        this.estagiario.keyAuth = data.estagiario.keyAuth;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this._estagiarioService.update(this.estagiario, this.key);
    } else {
      this._estagiarioService.insert(this.estagiario);
    }
    this.estagiario = new Estagiario();
    this.key = null;
  }

  delete(key: string) {
    this._estagiarioService.delete(key);
  }

  edit(estagiario: Estagiario, key: string) {
    this._estagiarioDataService.obtemEstagiario(estagiario, key);
  }
}
