import { Injectable } from "@angular/core";
import { Admin } from "app/proxie/admin";
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private adminAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private _router: Router) {}

  fazerLogin(admin: Admin) {
    if (admin.login === "admin" && admin.senha === "123") {
      this.adminAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this._router.navigate(["/dashboard"]);
    } else {
      this.adminAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }
}
