import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  supervisor: Supervisor;
  supervisores: Observable<any>;
  key: string = '';
  campos: boolean = true;
  sucesso: boolean = false;
  sucesso2: boolean = false;
  carregando: boolean = false;
  popoverTitle = 'GClin - Faculdade Guairacá';
  popoverMessage = 'Deseja realmente exlcuir?';
  popoverMessage2 = 'Deseja realmente editar?';

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    private _supervisorService: SupervisorService,
    private _supervisorDataService: SupervisorDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.supervisor = new Supervisor();
    this.loadSupervisores();

    this._supervisorDataService.supervisorAtual.subscribe((data) => {
      if (data.supervisor && data.key) {
        this.supervisor = new Supervisor();
        this.supervisor.email = data.supervisor.email;
        this.supervisor.senha = data.supervisor.senha;
        this.supervisor.contato = data.supervisor.contato;
        this.supervisor.nome = data.supervisor.nome;
        this.key = data.key;
      }
    });
  }

  ngAfterViewInit() {
    // Forçar a detecção de mudanças para garantir que o DOM foi atualizado
    this.cdRef.detectChanges();
  }

  loadSupervisores() {
    this.supervisores = this._supervisorService.getAll();
  }

  async onSubmit() {
    this.supervisor.contato =
      '(' + this.supervisor.contato.substring(0, 2) + ') ' + this.supervisor.contato.substring(2);

    let supervisor: Supervisor = { ...this.supervisor };

    if (
      supervisor.email != null &&
      supervisor.senha != null &&
      supervisor.nome != null &&
      supervisor.contato != null
    ) {
      this.carregando = true;
      if (this.key) {
        await this._supervisorService.update(supervisor, this.key);
      } else {
        await this._supervisorService.insert(supervisor);
      }

      this.loadSupervisores();
      this.supervisor = new Supervisor();
      this.key = null;
      this.sucesso = true;
      await this.delay(3000);
      this.sucesso = false;
      this.carregando = false;

      // Usando setTimeout para garantir que o DOM foi atualizado antes de rolar
      setTimeout(() => {
        console.log('Chamada após a operação de submit');
        this.scrollToTop();
      }, 500); // Ajuste o tempo conforme necessário
    } else {
      this.campos = false;
      await this.delay(3000);
      this.campos = true;
    }
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  async delete(key: string) {
    this.carregando = true;
    await this._supervisorService.delete(key);
    this.loadSupervisores();
    this.sucesso2 = true;
    await this.delay(3000);
    this.sucesso2 = false;
    this.carregando = false;

    // Usando setTimeout para garantir que o DOM foi atualizado antes de rolar
    setTimeout(() => {
      console.log('Chamada após a operação de delete');
      this.scrollToTop();
    }, 500); // Ajuste o tempo conforme necessário
  }

  edit(supervisor: Supervisor, key: string) {
    this._supervisorDataService.obtemSupervisor(supervisor, key);
  }

  private scrollToTop(): void {
    console.log('Tentando rolar para o topo');
    // Aguardando o scrollContainer estar disponível
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('scrollContainer não encontrado, tentando com main-panel');
      const mainPanel = document.querySelector('.main-panel');
      if (mainPanel) {
        mainPanel.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.log('main-panel não encontrado, rolando para o topo da janela.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
