import { Injectable } from "@angular/core";
import { Admin } from "app/proxie/admin";
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { SupervisorService } from "./supervisor.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  supervisor: any;
  supervisorAutenticado: boolean = false;
  adminAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  supervisores: Observable<any[]>;
  list_supervisores: any[] = [];

  constructor(
    private _router: Router,
    private _supervisorService: SupervisorService
  ) {
    this.supervisores = this._supervisorService.getAll();
    console.log(this.supervisores);
  }

  fazerLogin(admin: Admin): boolean {
    if (admin.login === "admin" && admin.senha === "Gu@iraca") {
      this.adminAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this._router.navigate(["/dashboard"]);
      return true;
    } else if (this.logarSuper(admin)) {
      console.log("logousuper");
      this.supervisorAutenticado = true;
      this.mostrarMenuEmitter.emit(false);
      this._router.navigate(["/supervisoes/" + this.supervisor]);
      return true;
    } else {
      this.adminAutenticado = false;
      this.supervisorAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      return false;
    }
  }

  logarSuper(admin: Admin): boolean {
    this.supervisores.subscribe(res => {
      this.list_supervisores = res;
    });
    for (let supervisor of this.list_supervisores) {
      if (supervisor.email == admin.login && supervisor.senha == admin.senha) {
        this.supervisor = supervisor.email;
        return true;
      }
    }
    return false;
  }
}
