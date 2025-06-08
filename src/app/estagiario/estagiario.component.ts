import { Component, OnInit } from "@angular/core";
import { EstagiarioService } from "app/service/estagiario.service";
import { EstagiarioDataService } from "app/service/estagiario-data.service";
import { Estagiario } from "app/service/estagiario";
import { Observable } from "rxjs";
import { SupervisorService } from "app/service/supervisor.service";

@Component({
  selector: "app-user",
  templateUrl: "./estagiario.component.html",
  styleUrls: ["./estagiario.component.css"]
})
export class EstagiarioComponent implements OnInit {
  estagiario: Estagiario;
  estagiarios: Observable<any>;
  supervisores: Observable<any>;
  key: string = "";
  campos: boolean = true;
  sucesso: boolean = false;
  sucesso2: boolean = false;
  carregando: boolean = false;
  popoverTitle = "GClin - Faculdade Guairacá";
  popoverMessage = "Deseja realmente excluir?";
  popoverMessage2 = "Deseja realmente editar?";

  constructor(
    private _estagiarioService: EstagiarioService,
    private _estagiarioDataService: EstagiarioDataService,
    private _supervisorService: SupervisorService
  ) {}

  ngOnInit() {
    this.estagiario = new Estagiario();
    this.loadEstagiarios();
    this.supervisores = this._supervisorService.getAll();

    this._estagiarioDataService.estagiarioAtual.subscribe(data => {
      if (data.estagiario && data.key) {
        this.estagiario = { ...data.estagiario };
        this.key = data.key;
      }
    });
  }

  loadEstagiarios() {
    this.estagiarios = this._estagiarioService.getAll();
  }

  async onSubmit() {
    if (this.estagiario.contato) {
      this.estagiario.contato =
        "(" +
        this.estagiario.contato.substring(0, 2) +
        ") " +
        this.estagiario.contato.substring(2);
    }

    let estagiario: Estagiario = { ...this.estagiario };

    if (
      estagiario.email &&
      estagiario.senha &&
      estagiario.ra &&
      estagiario.nome &&
      estagiario.contato &&
      estagiario.curso &&
      estagiario.supervisor
    ) {
      this.carregando = true;

      if (this.key) {
        await this._estagiarioService.update(estagiario, this.key);
      } else {
        await this._estagiarioService.insert(estagiario);
      }

      this.loadEstagiarios();
      this.estagiario = new Estagiario();
      this.key = null;
      this.sucesso = true;
      await this.delay(3000);
      this.sucesso = false;
      this.carregando = false;
      this.scrollToTop();
    } else {
      this.campos = false;
      await this.delay(3000);
      this.campos = true;
    }
  }

  async delete(key: string) {
    this.carregando = true;
    await this._estagiarioService.delete(key);
    this.loadEstagiarios();
    this.sucesso2 = true;
    await this.delay(3000);
    this.sucesso2 = false;
    this.carregando = false;
    this.scrollToTop();
  }

  edit(estagiario: Estagiario, key: string) {
    this._estagiarioDataService.obtemEstagiario(estagiario, key);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private scrollToTop(): void {
    const mainPanel = document.querySelector('.main-panel');
    if (mainPanel) {
      mainPanel.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
