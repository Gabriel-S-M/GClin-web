import { Component, OnInit, AfterViewInit } from "@angular/core";
import { LoginService } from "app/service/login.service";
import { Router } from "@angular/router";
import PerfectScrollbar from "perfect-scrollbar";

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
export class SidebarComponent implements OnInit, AfterViewInit {
  menuItems: any[];
  mostrarMenu: boolean = false;
  mostrarMenuAdm: boolean = false;
  private psInitialized = false;

  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    // Inicializar o estado do menu baseado no localStorage
    const mostrarMenuAdm = localStorage.getItem("mostrarMenuAdm");
    const mostrarMenu = localStorage.getItem("mostrarMenu");

    if (mostrarMenuAdm !== null) {
      this.mostrarMenuAdm = mostrarMenuAdm === "true";
    }

    if (mostrarMenu !== null) {
      this.mostrarMenu = mostrarMenu === "true";
    }

    this.menuItems = ROUTES.filter(menuItem => menuItem);

    // Escutando a mudança no menu (login/logout)
    this._loginService.mostrarMenuEmitterAdm.subscribe(mostrar => {
      this.mostrarMenuAdm = mostrar;
      console.log("mostrarMenuAdm atualizado:", mostrar);
      this.saveMenuState(); // Salvar no localStorage
      if (mostrar) {
        setTimeout(() => this.initPerfectScrollbar(), 0);
      }
    });

    this._loginService.mostrarMenuEmitter.subscribe(mostrar => {
      this.mostrarMenu = mostrar;
      console.log("mostrarMenu atualizado:", mostrar);
      this.saveMenuState(); // Salvar no localStorage
      if (mostrar) {
        setTimeout(() => this.initPerfectScrollbar(), 0);
      }
    });
  }

  ngAfterViewInit() {
    // Caso o menu já esteja visível ao carregar
    if (this.mostrarMenuAdm || this.mostrarMenu) {
      setTimeout(() => this.initPerfectScrollbar(), 0);
    }
  }

  initPerfectScrollbar() {
    if (!this.psInitialized) {
      const elemSidebar = document.querySelector(".sidebar .sidebar-wrapper") as HTMLElement;
      if (elemSidebar) {
        new PerfectScrollbar(elemSidebar);
        this.psInitialized = true;
        console.log("PerfectScrollbar inicializado na sidebar!");
      } else {
        console.warn("Elemento .sidebar .sidebar-wrapper não encontrado.");
      }
    }
  }

  isMobileMenu() {
    return $(window).width() <= 991;
  }

  logout(): void {
    this.mostrarMenuAdm = false;
    this.mostrarMenu = false;
    this._loginService.adminAutenticado = false;
    this._loginService.supervisorAutenticado = false;
    this.psInitialized = false;

    // Limpa tudo relacionado ao login
    localStorage.removeItem("adminAutenticado");
    localStorage.removeItem("supervisorAutenticado");
    localStorage.removeItem("supervisor");
    localStorage.removeItem("lastRoute");
    localStorage.removeItem("mostrarMenuAdm");
    localStorage.removeItem("mostrarMenu");
    localStorage.removeItem("scrollY");

    this._router.navigate(["/login"]);
  }


  // Salvar o estado atual do menu no localStorage
  saveMenuState() {
    localStorage.setItem("mostrarMenuAdm", this.mostrarMenuAdm.toString());
    localStorage.setItem("mostrarMenu", this.mostrarMenu.toString());
  }
}
