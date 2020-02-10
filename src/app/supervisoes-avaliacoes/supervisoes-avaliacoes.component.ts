import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PacienteService } from "app/service/paciente.service";

@Component({
  selector: "app-supervisoes-avaliacoes",
  templateUrl: "./supervisoes-avaliacoes.component.html",
  styleUrls: ["./supervisoes-avaliacoes.component.scss"]
})
export class SupervisoesAvaliacoesComponent implements OnInit {
  key: string;
  pacientes: any;
  paciente: any;
  listaAvaliacoes: any[] = [];
  supervisor: any;
  estagiario: any;

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

            if (this.paciente.avaliacoes) {
              this.listaAvaliacoes = Object.entries(this.paciente.avaliacoes);
            }
          });
        });
      }
    });
  }
  voltar() {
    console.log(this.key);
    this._router.navigate([
      "/supervisoes-pacientes/",
      this.supervisor,
      this.estagiario
    ]);
  }

  aprovar(keyAvaliacao, avaliacao, parecer) {
    avaliacao.aprovacao = true;
    avaliacao.dados_aprovacao = parecer;
    this._pacienteService.updateAvaliacao(this.key, keyAvaliacao, avaliacao);
  }
}
