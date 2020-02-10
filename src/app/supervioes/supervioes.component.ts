import { Component, OnInit } from "@angular/core";
import { Estagiario } from "app/service/estagiario";
import { Observable } from "rxjs";
import { EstagiarioService } from "app/service/estagiario.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-supervioes",
  templateUrl: "./supervioes.component.html",
  styleUrls: ["./supervioes.component.scss"]
})
export class SupervioesComponent implements OnInit {
  estagiario: Estagiario;
  estagiarios: Observable<any>;
  supervisor: any;

  constructor(
    private _estagiarioService: EstagiarioService,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      if (parametros["supervisor"]) {
        this.supervisor = parametros["supervisor"];
        this.estagiarios = this._estagiarioService.buscarTodos(this.supervisor);
      }
    });
  }

  irParaPacientes(key: any) {
    console.log(key);
    this._router.navigate(["/supervisoes-pacientes/", this.supervisor, key]);
  }
}
