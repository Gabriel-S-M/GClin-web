// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.checkAutenticacao();
    this.restaurarEstadoSidebar();

    // Salvar a última rota após cada navegação
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        localStorage.setItem("lastRoute", event.urlAfterRedirects);
      });
  }

  restaurarEstadoSidebar(): void {
    const mostrarMenuAdm = localStorage.getItem("mostrarMenuAdm");
    const mostrarMenu = localStorage.getItem("mostrarMenu");

    if (mostrarMenuAdm !== null) {
      this.loginService.mostrarMenuEmitterAdm.emit(mostrarMenuAdm === "true");
    }

    if (mostrarMenu !== null) {
      this.loginService.mostrarMenuEmitter.emit(mostrarMenu === "true");
    }
  }

  isMap(path: string): boolean {
    const titlee = window.location.pathname.slice(1);
    return path !== titlee;
  }
}
