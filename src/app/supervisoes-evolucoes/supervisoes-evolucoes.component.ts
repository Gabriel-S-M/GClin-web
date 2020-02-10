import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-supervisoes-evolucoes",
  templateUrl: "./supervisoes-evolucoes.component.html",
  styleUrls: ["./supervisoes-evolucoes.component.scss"]
})
export class SupervisoesEvolucoesComponent implements OnInit {
  key: string;
  pacientes: any;
  paciente: any;
  listaEvolucoes: any[] = [];
  supervisor: any;
  estagiario: any;
  parecer: any;

  constructor(
    private _pacienteService: PacienteService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (
        parametros["key"] &&
        parametros["supervisor"] &&
        parametros["estagiario"]
      ) {
        this.key = parametros["key"];
        this.pacientes = this._pacienteService.get(this.key);
        this.supervisor = parametros["supervisor"];
        this.estagiario = parametros["estagiario"];
        this.pacientes.forEach(x => {
          const lista = x as Array<any>;

          lista.forEach(paciente => {
            this.paciente = paciente;

            if (this.paciente.evolucoes) {
              this.listaEvolucoes = Object.entries(this.paciente.evolucoes);
            }
          });
        });
      }
    });
  }

  voltar() {
    this._router.navigate([
      "/supervisoes-pacientes/",
      this.supervisor,
      this.estagiario
    ]);
  }

  aprovar(keyEvolucao, evolucao, parecer) {
    evolucao.aprovacao = true;
    evolucao.dados_aprovacao = parecer;
    this._pacienteService.updateEvolucao(this.key, keyEvolucao, evolucao);
  }
}
