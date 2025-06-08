import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-supervisoes-pacientes",
  templateUrl: "./supervisoes-pacientes.component.html",
  styleUrls: ["./supervisoes-pacientes.component.scss"]
})
export class SupervisoesPacientesComponent implements OnInit {
  estagiario: any;
  supervisor: any;
  pacientes: any;
  paciente: any;
  listaResponsaveis: any[] = [];
  listaPacientes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros["estagiario"] && parametros["supervisor"]) {
        this.estagiario = parametros["estagiario"];
        this.supervisor = parametros["supervisor"];
        this.pacientes = this._pacienteService.getAll();
        this.listarPacientes();
        console.log(this.listaPacientes.length);
      }
    });
  }

  listarPacientes() {
    this.pacientes.forEach(x => {
      const lista = x as Array<any>;
      lista.forEach(paciente => {
        this.paciente = paciente;

        if (this.paciente.responsaveis) {
          this.listaResponsaveis = Object.entries(
            this.paciente.responsaveis
          ).map(x => {
            let teste: any = x;
            if (teste[1].keyAuth == this.estagiario) {
              this.listaPacientes.push(this.paciente);
            }
          });
        }
      });
    });
  }

  voltar() {
    this._router.navigate(["/supervisoes/", this.supervisor]);
  }

  irParaAcolhimento(key: string) {
    this._router.navigate([
      "/supervisoes-acolhimentos/",
      this.supervisor,
      this.estagiario,
      key
    ]);
  }

  irParaAvaliacao(key: string) {
    this._router.navigate([
      "/supervisoes-avaliacoes/",
      this.supervisor,
      this.estagiario,
      key
    ]);
  }

  irParaEvolucao(key: string) {
    this._router.navigate([
      "/supervisoes-evolucoes/",
      this.supervisor,
      this.estagiario,
      key
    ]);
  }
}
