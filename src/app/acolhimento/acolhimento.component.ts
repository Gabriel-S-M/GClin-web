import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-acolhimento",
  templateUrl: "./acolhimento.component.html",
  styleUrls: ["./acolhimento.component.scss"]
})
export class AcolhimentoComponent implements OnInit {
  key: string;
  pacientes: any;
  paciente: any;
  listaAcolhimento: any[] = [];

  constructor(
    private _pacienteService: PacienteService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros["key"]) {
        this.key = parametros["key"];
        console.log(this.key);
        this.pacientes = this._pacienteService.get(this.key);

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
    this._router.navigate(["/table"]);
  }
}
