import { Component, OnInit } from "@angular/core";
import { LoginService } from "app/service/login.service";
import { Router } from "@angular/router";

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Painel", icon: "pe-7s-date", class: "" },
  { path: "/estagiario", title: "Estagiários", icon: "pe-7s-user", class: "" },
  { path: "/paciente", title: "Pacientes", icon: "pe-7s-id", class: "" },
  { path: "/supervisor", title: "Supervisor", icon: "pe-7s-users", class: "" }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  mostrarMenu: boolean = false;

  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    this._loginService.mostrarMenuEmitter.subscribe(mostrar => {
      (this.mostrarMenu = mostrar), console.log(mostrar);
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.mostrarMenu = false;
    this._loginService.adminAutenticado = false;
    this._router.navigate(["/login"]);
  }
}
