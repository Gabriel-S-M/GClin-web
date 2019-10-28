import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-evolucao",
  templateUrl: "./evolucao.component.html",
  styleUrls: ["./evolucao.component.scss"]
})
export class EvolucaoComponent implements OnInit {
  key: string;
  pacientes: any;
  paciente: any;
  listaEvolucoes: any[] = [];

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

            if (this.paciente.evolucoes) {
              this.listaEvolucoes = Object.keys(this.paciente.evolucoes).map(
                x => this.paciente.evolucoes[x]
              );
            }
          });
        });
      }
    });
  }
  voltar() {
    this._router.navigate(["/table"]);
  }
}
