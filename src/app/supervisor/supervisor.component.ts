import {  Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import { Supervisor } from 'app/service/supervisor';
import { SupervisorService } from 'app/service/supervisor.service';
import { SupervisorDataService } from 'app/service/supervisor-data.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss'],
})
export class SupervisorComponent implements OnInit, AfterViewInit {
  supervisor: Supervisor = new Supervisor();
  supervisores$: Observable<any>;
  supervisoresArray: Supervisor[] = [];

  key: string = '';

  // Alertas
  campos: boolean = true;
  sucesso: boolean = false;
  sucesso2: boolean = false;
  carregando: boolean = false;

  // Mensagens popover
  popoverTitle = 'GClin - Faculdade Guairacá';
  popoverMessage = 'Deseja realmente excluir?';
  popoverMessage2 = 'Deseja realmente editar?';

  // Busca e Paginação
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    private _supervisorService: SupervisorService,
    private _supervisorDataService: SupervisorDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSupervisores();

    this._supervisorDataService.supervisorAtual.subscribe((data) => {
      if (data?.supervisor && data.key) {
        this.supervisor = { ...data.supervisor };
        this.key = data.key;
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  loadSupervisores(): void {
    this.carregando = true;
    this.supervisores$ = this._supervisorService.getAll();
    this.supervisores$.subscribe(data => {
      this.supervisoresArray = data;
      this.carregando = false;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.supervisor.contato) {
      this.supervisor.contato =
        `(${this.supervisor.contato.substring(0, 2)}) ${this.supervisor.contato.substring(2)}`;
    }

    const supervisor: Supervisor = { ...this.supervisor };

    if (
      supervisor.email &&
      supervisor.senha &&
      supervisor.nome &&
      supervisor.contato
    ) {
      this.carregando = true;

      if (this.key) {
        await this._supervisorService.update(supervisor, this.key);
      } else {
        await this._supervisorService.insert(supervisor);
      }

      this.resetForm();
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

  async delete(key: string): Promise<void> {
    this.carregando = true;
    await this._supervisorService.delete(key);
    this.loadSupervisores();

    this.sucesso2 = true;
    await this.delay(3000);
    this.sucesso2 = false;
    this.carregando = false;
    this.scrollToTop();
  }

  edit(supervisor: Supervisor, key: string): void {
    this._supervisorDataService.obtemSupervisor(supervisor, key);
  }

  // 🔍 Busca e paginação
  get filteredSupervisores(): Supervisor[] {
    const filtered = this.supervisoresArray.filter(s =>
      s.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    const filteredCount = this.supervisoresArray.filter(s =>
      s.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
    return Math.ceil(filteredCount / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // 🔧 Utilitários
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private resetForm(): void {
    this.supervisor = new Supervisor();
    this.key = '';
    this.loadSupervisores();
  }

  private scrollToTop(): void {
    const container = this.scrollContainer?.nativeElement;

    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const mainPanel = document.querySelector('.main-panel');
      if (mainPanel) {
        mainPanel.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
