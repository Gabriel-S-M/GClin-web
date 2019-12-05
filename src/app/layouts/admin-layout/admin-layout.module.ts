import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LbdModule } from "../../lbd/lbd.module";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { HomeComponent } from "../../home/home.component";
import { EstagiarioComponent } from "../../estagiario/estagiario.component";
import { PacienteComponent } from "../../paciente/paciente.component";
import { AcolhimentoComponent } from "app/acolhimento/acolhimento.component";
import { EvolucaoComponent } from "app/evolucao/evolucao.component";
import { NgxMaskModule } from "ngx-mask";
import { LoginComponent } from "app/login/login.component";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { SupervisorComponent } from "app/supervisor/supervisor.component";
import { SupervioesComponent } from "app/supervioes/supervioes.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NgxMaskModule.forRoot({}),
    ConfirmationPopoverModule.forRoot({ confirmButtonType: "danger" })
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    EstagiarioComponent,
    PacienteComponent,
    AcolhimentoComponent,
    EvolucaoComponent,
    SupervisorComponent,
    SupervioesComponent
  ]
})
export class AdminLayoutModule {}
