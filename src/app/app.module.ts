import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { SidebarModule } from "./sidebar/sidebar.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire";
import { environment } from "environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthGuardService } from "./service/auth-guard.service";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    SidebarModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ConfirmationPopoverModule.forRoot({ confirmButtonType: "danger" })
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [AngularFireAuth, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
