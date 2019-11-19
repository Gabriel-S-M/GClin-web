import { Injectable } from "@angular/core";
import { Admin } from "app/proxie/admin";
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  adminAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private _router: Router) {}

  fazerLogin(admin: Admin): boolean {
    if (admin.login === "admin" && admin.senha === "Gu@iraca") {
      this.adminAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this._router.navigate(["/dashboard"]);
      return true;
    } else {
      this.adminAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      return false;
    }
  }
}
