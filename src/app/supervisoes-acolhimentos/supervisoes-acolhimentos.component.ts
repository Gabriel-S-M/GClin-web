import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-supervisoes-acolhimentos",
  templateUrl: "./supervisoes-acolhimentos.component.html",
  styleUrls: ["./supervisoes-acolhimentos.component.scss"]
})
export class SupervisoesAcolhimentosComponent implements OnInit {
  key: string;
  pacientes: any;
  paciente: any;
  listaAcolhimento: any[] = [];
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
        console.log(this.key);
        this.pacientes = this._pacienteService.get(this.key);
        this.supervisor = parametros["supervisor"];
        this.estagiario = parametros["estagiario"];
        this.pacientes.forEach(x => {
          const lista = x as Array<any>;

          lista.forEach(paciente => {
            this.paciente = paciente;

            if (this.paciente.acolhimento) {
              this.listaAcolhimento = Object.keys(
                this.paciente.acolhimento
              ).map(x => this.paciente.acolhimento[x]);
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
}
