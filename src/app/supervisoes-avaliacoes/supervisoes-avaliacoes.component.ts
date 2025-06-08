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
  paciente: any = null;
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
      if (parametros["key"] && parametros["supervisor"] && parametros["estagiario"]) {
        this.key = parametros["key"];
        this.supervisor = parametros["supervisor"];
        this.estagiario = parametros["estagiario"];

        // Correção: usar subscribe no Observable
        this._pacienteService.get(this.key).subscribe(lista => {
          if (lista && lista.length > 0) {
            this.paciente = lista[0];
            if (this.paciente.avaliacoes) {
              // Transforma avaliações em array para iteração
              this.listaAvaliacoes = Object.entries(this.paciente.avaliacoes);
            }
          } else {
            this.listaAvaliacoes = [];
          }
        });
      }
    });
  }

  voltar() {
    this._router.navigate(["/supervisoes-pacientes/", this.supervisor, this.estagiario]);
  }

  aprovar(keyAvaliacao, avaliacao, parecer) {
    if (!avaliacao) return; // segurança extra
    avaliacao.aprovacao = true;
    avaliacao.dados_aprovacao = parecer || "Sem observações";
    this._pacienteService.updateAvaliacao(this.key, keyAvaliacao, avaliacao);
  }
}
