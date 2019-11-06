import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { LbdModule } from "../../lbd/lbd.module";
import { NguiMapModule } from "@ngui/map";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { HomeComponent } from "../../home/home.component";
import { UserComponent } from "../../user/user.component";
import { TablesComponent } from "../../tables/tables.component";
import { AcolhimentoComponent } from "app/acolhimento/acolhimento.component";
import { EvolucaoComponent } from "app/evolucao/evolucao.component";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NgxMaskModule.forRoot({})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    AcolhimentoComponent,
    EvolucaoComponent
  ]
})
export class AdminLayoutModule {}
