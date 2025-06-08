import { Injectable } from "@angular/core";

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private _loginService: LoginService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (
      this._loginService.adminAutenticado ||
      this._loginService.supervisorAutenticado
    ) {
      return true;
    } else {
      this._router.navigate(["/login"]);
      return false;
    }
  }
}