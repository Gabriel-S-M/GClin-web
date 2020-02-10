import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-avaliacao",
  templateUrl: "./avaliacao.component.html",
  styleUrls: ["./avaliacao.component.scss"]
})
export class AvaliacaoComponent implements OnInit {
  key: string;
  pacientes: any;
  paciente: any;
  listaAvaliacoes: any[] = [];

  constructor(
    private _pacienteService: PacienteService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros["key"]) {
        this.key = parametros["key"];
        this.pacientes = this._pacienteService.get(this.key);

        this.pacientes.forEach(x => {
          const lista = x as Array<any>;

          lista.forEach(paciente => {
            this.paciente = paciente;

            if (this.paciente.avaliacoes) {
              this.listaAvaliacoes = Object.keys(this.paciente.avaliacoes).map(
                x => this.paciente.avaliacoes[x]
              );
            }
          });
        });
      }
    });
  }

  voltar() {
    this._router.navigate(["/paciente"]);
  }
}
