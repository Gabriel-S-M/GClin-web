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
  campos: boolean = true;
  sucesso: boolean = false;
  popoverTitle = "GClin - Faculdade Guairacá";
  popoverMessage = "Deseja realmente exlcuir?";
  popoverMessage2 = "Deseja realmente editar?";

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

  async onSubmit() {
    this.estagiario.contato =
      "(" +
      this.estagiario.contato.substring(0, 2) +
      ") " +
      this.estagiario.contato.substring(2);
    let estagiario: Estagiario = { ...this.estagiario };
    if (
      estagiario.email != null &&
      estagiario.senha != null &&
      estagiario.ra != null &&
      estagiario.nome != null &&
      estagiario.contato != null &&
      estagiario.curso != null
    ) {
      if (this.key) {
        this._estagiarioService.update(estagiario, this.key);
      } else {
        this._estagiarioService.insert(estagiario);
      }
      this.sucesso = true;
      await this.delay(10000);
      this.sucesso = false;
      this.estagiario = new Estagiario();
      this.key = null;
    } else {
      this.campos = false;
      await this.delay(10000);
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
    this._estagiarioService.delete(key);
  }

  edit(estagiario: Estagiario, key: string) {
    this._estagiarioDataService.obtemEstagiario(estagiario, key);
  }
}
