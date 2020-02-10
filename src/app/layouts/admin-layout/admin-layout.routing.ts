import { Routes } from "@angular/router";

import { HomeComponent } from "../../home/home.component";
import { EstagiarioComponent } from "../../estagiario/estagiario.component";
import { PacienteComponent } from "../../paciente/paciente.component";
import { AcolhimentoComponent } from "app/acolhimento/acolhimento.component";
import { EvolucaoComponent } from "app/evolucao/evolucao.component";
import { LoginComponent } from "app/login/login.component";
import { AuthGuardService } from "app/service/auth-guard.service";
import { SupervisorComponent } from "app/supervisor/supervisor.component";
import { AuthGuardService2 } from "app/service/auth-guard.service2";
import { SupervioesComponent } from "app/supervioes/supervioes.component";
import { SupervisoesPacientesComponent } from "app/supervisoes-pacientes/supervisoes-pacientes.component";
import { SupervisoesAcolhimentosComponent } from "app/supervisoes-acolhimentos/supervisoes-acolhimentos.component";
import { SupervisoesAvaliacoesComponent } from "app/supervisoes-avaliacoes/supervisoes-avaliacoes.component";
import { SupervisoesEvolucoesComponent } from "app/supervisoes-evolucoes/supervisoes-evolucoes.component";
import { AvaliacaoComponent } from "app/avaliacao/avaliacao.component";

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
    component: PacienteComponent
    // canActivate: [AuthGuardService]
  },
  {
    path: "supervisor",
    component: SupervisorComponent,
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
  },
  {
    path: "avaliacao/:key",
    component: AvaliacaoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "supervisoes/:supervisor",
    component: SupervioesComponent
    // canActivate: [AuthGuardService2]
  },
  {
    path: "supervisoes-pacientes/:supervisor/:estagiario",
    component: SupervisoesPacientesComponent
    // canActivate: [AuthGuardService2]
  },
  {
    path: "supervisoes-acolhimentos/:supervisor/:estagiario/:key",
    component: SupervisoesAcolhimentosComponent
    // canActivate: [AuthGuardService2]
  },
  {
    path: "supervisoes-avaliacoes/:supervisor/:estagiario/:key",
    component: SupervisoesAvaliacoesComponent
    // canActivate: [AuthGuardService2]
  },
  {
    path: "supervisoes-evolucoes/:supervisor/:estagiario/:key",
    component: SupervisoesEvolucoesComponent
    // canActivate: [AuthGuardService2]
  }
];
