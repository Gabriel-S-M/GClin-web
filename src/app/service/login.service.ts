import { Injectable, EventEmitter } from "@angular/core";
import { Admin } from "app/proxie/admin";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { SupervisorService } from "./supervisor.service";
import { NavigationService } from "./navigation.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  supervisor: any;
  supervisorAutenticado: boolean = false;
  adminAutenticado: boolean = false;
  mostrarMenuEmitterAdm = new EventEmitter<boolean>();
  mostrarMenuEmitter = new EventEmitter<boolean>();
  supervisores: Observable<any[]>;
  list_supervisores: any[] = [];

  constructor(
    private _router: Router,
    private _supervisorService: SupervisorService,
    private _navigationService: NavigationService
  ) {
    this.supervisores = this._supervisorService.getAll();
    this.checkAutenticacao();
  }

  checkAutenticacao(): void {
    const adminAutenticado = localStorage.getItem("adminAutenticado");
    const supervisorAutenticado = localStorage.getItem("supervisorAutenticado");

    if (adminAutenticado === "true") {
      this.adminAutenticado = true;
      this.mostrarMenuEmitterAdm.emit(true);
      this.mostrarMenuEmitter.emit(true);
    } else if (supervisorAutenticado === "true") {
      this.supervisor = localStorage.getItem("supervisor");
      this.supervisorAutenticado = true;
      this.mostrarMenuEmitterAdm.emit(false);
      this.mostrarMenuEmitter.emit(true);
    }

    // Restaurar estado de menu
    const mostrarMenuAdm = localStorage.getItem("mostrarMenuAdm");
    const mostrarMenu = localStorage.getItem("mostrarMenu");

    if (mostrarMenuAdm) {
      this.mostrarMenuEmitterAdm.emit(mostrarMenuAdm === "true");
    }

    if (mostrarMenu) {
      this.mostrarMenuEmitter.emit(mostrarMenu === "true");
    }

    // Restaurar scroll
    const savedScrollY = localStorage.getItem("scrollY");
    if (savedScrollY) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollY, 10));
      }, 0);
    }
  }


  redirectToLastRoute(): void {
    const lastRoute = localStorage.getItem("lastRoute");

    if (lastRoute) {
      this._router.navigate([lastRoute]);
    } else if (this.adminAutenticado === true) {
      this._router.navigate(["/dashboard"]);
    } else if (this.supervisorAutenticado === true) {
      this._router.navigate(["/supervisoes/" + this.supervisor]);
    }
  }

  salvarEstado(estadoMenuAdm: boolean, estadoMenu: boolean): void {
    localStorage.setItem("scrollY", window.scrollY.toString());
    localStorage.setItem("mostrarMenuAdm", estadoMenuAdm.toString());
    localStorage.setItem("mostrarMenu", estadoMenu.toString());
  }

  async fazerLogin(admin: Admin): Promise<boolean> {
    const cond: boolean = await this.logarSuper(admin);

    if (admin.login === "admin" && admin.senha === "Gu@iraca") {
      this.adminAutenticado = true;
      this.mostrarMenuEmitterAdm.emit(true);
      this.mostrarMenuEmitter.emit(true);
      localStorage.setItem("adminAutenticado", "true");
      localStorage.removeItem("supervisorAutenticado");
      localStorage.removeItem("supervisor");
      this.salvarEstado(true, true);
      this._router.navigate(["/dashboard"]);
      return true;
    } else if (cond) {
      this.supervisorAutenticado = true;
      this.mostrarMenuEmitterAdm.emit(false);
      this.mostrarMenuEmitter.emit(true);
      localStorage.setItem("supervisorAutenticado", "true");
      localStorage.setItem("supervisor", this.supervisor);
      localStorage.removeItem("adminAutenticado");
      this.salvarEstado(false, true);
      this._router.navigate(["/supervisoes/" + this.supervisor]);
      return true;
    } else {
      this.adminAutenticado = false;
      this.supervisorAutenticado = false;
      localStorage.removeItem("adminAutenticado");
      localStorage.removeItem("supervisorAutenticado");
      localStorage.removeItem("supervisor");
      this.mostrarMenuEmitterAdm.emit(false);
      this.mostrarMenuEmitter.emit(false);
      return false;
    }
  }

  async logarSuper(admin: Admin): Promise<boolean> {
    return new Promise((resolve) => {
      this.supervisores.subscribe(res => {
        this.list_supervisores = res;
        for (let supervisor of this.list_supervisores) {
          if (supervisor.email === admin.login && supervisor.senha === admin.senha) {
            this.supervisor = supervisor.email;
            resolve(true);
            return;
          }
        }
        resolve(false);
      });
    });
  }

  logout(): void {
    this.adminAutenticado = false;
    this.supervisorAutenticado = false;
    localStorage.removeItem("adminAutenticado");
    localStorage.removeItem("supervisorAutenticado");
    localStorage.removeItem("supervisor");
    this._navigationService.clearLastRoute();
    this.mostrarMenuEmitterAdm.emit(false);
    this.mostrarMenuEmitter.emit(false);
    this._router.navigate(["/login"]);
  }
}
