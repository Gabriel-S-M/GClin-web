import { Routes } from "@angular/router";

import { HomeComponent } from "../../home/home.component";
import { UserComponent } from "../../user/user.component";
import { TablesComponent } from "../../tables/tables.component";
import { AcolhimentoComponent } from "app/acolhimento/acolhimento.component";
import { EvolucaoComponent } from "app/evolucao/evolucao.component";
import { LoginComponent } from "app/login/login.component";
import { AuthGuardService } from "app/service/auth-guard.service";

export const AdminLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: "user", component: UserComponent, canActivate: [AuthGuardService] },
  {
    path: "table",
    component: TablesComponent,
    canActivate: [AuthGuardService]
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
