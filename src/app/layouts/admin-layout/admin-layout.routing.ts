import { Routes } from "@angular/router";

import { HomeComponent } from "../../home/home.component";
import { UserComponent } from "../../user/user.component";
import { TablesComponent } from "../../tables/tables.component";
import { AcolhimentoComponent } from "app/acolhimento/acolhimento.component";
import { EvolucaoComponent } from "app/evolucao/evolucao.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: HomeComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TablesComponent },
  { path: "acolhimento/:key", component: AcolhimentoComponent },
  { path: "evolucao/:key", component: EvolucaoComponent }
];
