import { Component, OnInit } from "@angular/core";
import { LoginService } from "app/service/login.service";
import { Admin } from "app/proxie/admin";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login: any;
  senha: any;
  user: Admin;
  erro: boolean = false;

  constructor(private _loginService: LoginService) {
    this.user = new Admin();
  }

  ngOnInit() {}

  logar() {
    this.user.login = this.login;
    this.user.senha = this.senha;
    if (this._loginService.fazerLogin(this.user)) {
    } else {
      this.erro = true;
    }
  }
}
