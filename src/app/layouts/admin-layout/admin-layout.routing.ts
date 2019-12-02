import { Routes } from "@angular/router";

import { HomeComponent } from "../../home/home.component";
import { EstagiarioComponent } from "../../estagiario/estagiario.component";
import { PacienteComponent } from "../../paciente/paciente.component";
import { AcolhimentoComponent } from "app/acolhimento/acolhimento.component";
import { EvolucaoComponent } from "app/evolucao/evolucao.component";
import { LoginComponent } from "app/login/login.component";
import { AuthGuardService } from "app/service/auth-guard.service";
import { SupervisorComponent } from "app/supervisor/supervisor.component";

export const AdminLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "estagiario",
    component: EstagiarioComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "paciente",
    component: PacienteComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "supervisor",
    component: SupervisorComponent
    //canActivate: [AuthGuardService]
  },
  {
    path: "acolhimento/:key",
    component: AcolhimentoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "evolucao/:key",
    component: EvolucaoComponent,
    canActivate: [AuthGuardService]
  }
];
