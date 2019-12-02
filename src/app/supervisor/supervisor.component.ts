import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Supervisor } from "app/service/supervisor";
import { SupervisorService } from "app/service/supervisor.service";
import { SupervisorDataService } from "app/service/supervisor-data.service";

@Component({
  selector: "app-supervisor",
  templateUrl: "./supervisor.component.html",
  styleUrls: ["./supervisor.component.scss"]
})
export class SupervisorComponent implements OnInit {
  supervisor: Supervisor;
  supervisores: Observable<any>;
  key: string = "";
  campos: boolean = true;
  sucesso: boolean = false;
  popoverTitle = "GClin - Faculdade Guairacá";
  popoverMessage = "Deseja realmente exlcuir?";
  popoverMessage2 = "Deseja realmente editar?";

  constructor(
    private _supervisorService: SupervisorService,
    private _supervisorDataService: SupervisorDataService
  ) {}

  ngOnInit() {
    this.supervisor = new Supervisor();
    this.supervisores = this._supervisorService.getAll();
    this._supervisorDataService.supervisorAtual.subscribe(data => {
      if (data.supervisor && data.key) {
        this.supervisor = new Supervisor();
        this.supervisor.email = data.supervisor.email;
        this.supervisor.senha = data.supervisor.senha;
        this.supervisor.contato = data.supervisor.contato;
        this.supervisor.nome = data.supervisor.nome;
        this.supervisor.keyAuth = data.supervisor.keyAuth;
        this.key = data.key;
      }
    });
  }

  async onSubmit() {
    this.supervisor.contato =
      "(" +
      this.supervisor.contato.substring(0, 2) +
      ") " +
      this.supervisor.contato.substring(2);
    let supervisor: Supervisor = { ...this.supervisor };
    if (
      supervisor.email != null &&
      supervisor.senha != null &&
      supervisor.nome != null &&
      supervisor.contato != null
    ) {
      if (this.key) {
        this._supervisorService.update(supervisor, this.key);
      } else {
        this._supervisorService.insert(supervisor);
      }
      this.sucesso = true;
      await this.delay(3000);
      this.sucesso = false;
      this.supervisor = new Supervisor();
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
    this._supervisorService.delete(key);
  }

  edit(supervisor: Supervisor, key: string) {
    this._supervisorDataService.obtemSupervisor(supervisor, key);
  }
}
