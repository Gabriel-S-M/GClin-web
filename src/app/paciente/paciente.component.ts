import { Component, OnInit } from "@angular/core";
import { PacienteService } from "app/service/paciente.service";
import { PacienteDataService } from "app/service/paciente-data.service";
import { Paciente } from "app/service/paciente";
import { EstagiarioService } from "app/service/estagiario.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-tables",
  templateUrl: "./paciente.component.html",
  styleUrls: ["./paciente.component.css"]
})
export class PacienteComponent implements OnInit {
  paciente: Paciente;
  pacientes: Observable<any>;
  pacientesArray: any[] = [];

  estagiarios: any;
  listaResponsaveis: any[] = [];
  key: string = "";

  // Alertas
  campos: boolean = true;
  sucesso: boolean = false;
  sucesso2: boolean = false;
  carregando: boolean = false;

  // Mensagens popover
  popoverTitle = "GClin - Faculdade Guairacá";
  popoverMessage = "Deseja realmente excluir?";
  popoverMessage2 = "Deseja realmente editar?";

  // Dropdown
  dropdownList = [];
  selectedItems = [];
  responsaveis_fim: any = [];
  dropdownSettings = {};

  // Busca e Paginação
  searchTerm: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private _pacienteDataService: PacienteDataService,
    private _pacienteService: PacienteService,
    private _estagiarioService: EstagiarioService,
    private _router: Router,
    private _http: HttpClient
  ) {}

  ngOnInit() {
    this.paciente = new Paciente();
    this.loadPacientes();
    this.estagiarios = this._estagiarioService.getAll();

    this._pacienteDataService.pacienteAtual.subscribe(data => {
      if (data?.paciente && data?.key) {
        this.paciente = { ...data.paciente };
        this.key = data.key;
      }
    });

    this.estagiarios.forEach(x => {
      this.dropdownList = x;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: "keyAuth",
      textField: "nome",
      selectAllText: "Selecionar Todos",
      unSelectAllText: "Remover Seleção",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  loadPacientes() {
    this.carregando = true;
    this.pacientes = this._pacienteService.getAll();
    this.pacientes.subscribe(data => {
      this.pacientesArray = data;
      this.carregando = false;
    });
  }

  async onSubmit() {
    if (this.paciente.contato) {
      this.paciente.contato =
        "(" +
        this.paciente.contato.substring(0, 2) +
        ") " +
        this.paciente.contato.substring(2);
    }

    const paciente: Paciente = { ...this.paciente };

    if (
      this.paciente.nome &&
      this.paciente.contato &&
      this.paciente.responsaveis &&
      this.paciente.bairro &&
      this.paciente.cep &&
      this.paciente.cidade &&
      this.paciente.mae &&
      this.paciente.rua &&
      this.paciente.pai &&
      this.paciente.cpf &&
      this.paciente.sus &&
      this.paciente.rg &&
      this.paciente.nascimento &&
      this.paciente.numero
    ) {
      this.carregando = true;
      if (this.key) {
        await this._pacienteService.update(paciente, this.key);
      } else {
        await this._pacienteService.insert(paciente);
      }

      this.loadPacientes();
      this.paciente = new Paciente();
      this.key = "";
      this.sucesso = true;
      await this.delay(3000);
      this.sucesso = false;
      this.carregando = false;
      this.scrollToTop();
    } else {
      this.campos = false;
      await this.delay(3000);
      this.campos = true;
    }
  }

  async delete(key: string) {
    this.carregando = true;
    await this._pacienteService.delete(key);
    this.loadPacientes();
    this.sucesso2 = true;
    await this.delay(3000);
    this.sucesso2 = false;
    this.carregando = false;
    this.scrollToTop();
  }

  edit(paciente: Paciente, key: string) {
    this._pacienteDataService.obtemPaciente(paciente, key);
  }

  // Navegação
  irParaAcolhimento(key: string) {
    this._router.navigate(["/acolhimento/" + key]);
  }

  irParaEvolucao(key: string) {
    this._router.navigate(["/evolucao/" + key]);
  }

  irParaAvaliacao(key: string) {
    this._router.navigate(["/avaliacao/" + key]);
  }

  // Conversões para dropdown
  converte(texto: any) {
    const [keyAuth, nome] = texto.split(" _ ");
    return nome;
  }

  converte2(resp: any) {
    resp.forEach(x => {
      this.responsaveis_fim.push(x.keyAuth + " _ " + x.nome);
    });
    return this.responsaveis_fim;
  }

  // Busca CEP
  buscaCep(cep: string) {
    if (cep !== " ") {
      const validaCep = /^[0-9]{8}$/;
      if (validaCep.test(cep)) {
        this._http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(dados => {
          let dadosQuebrados = JSON.parse(JSON.stringify(dados));
          this.paciente.rua = dadosQuebrados.logradouro;
          this.paciente.bairro = dadosQuebrados.bairro;
          this.paciente.cidade = dadosQuebrados.localidade;
        });
      }
    }
  }

  // 🔥 ===== BUSCA E PAGINAÇÃO =====

  get filteredPacientes() {
    let filtered = this.pacientesArray.filter(paciente =>
      paciente.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    const filteredCount = this.pacientesArray.filter(paciente =>
      paciente.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
    return Math.ceil(filteredCount / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // 🔧 Utils
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private scrollToTop(): void {
    const mainPanel = document.querySelector('.main-panel');
    if (mainPanel) {
      mainPanel.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
