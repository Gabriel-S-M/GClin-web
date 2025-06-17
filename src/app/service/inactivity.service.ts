import { Injectable, NgZone, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InactivityService implements OnDestroy {

  private timeoutInMs = 3 * 60 * 60 * 1000; // 3 horas em milissegundos
  private timeoutId: any;

  constructor(private ngZone: NgZone) {
    this.startWatching();
  }

  private startWatching() {
    this.resetTimer();

    window.addEventListener('mousemove', this.resetTimer);
    window.addEventListener('mousedown', this.resetTimer);
    window.addEventListener('keypress', this.resetTimer);
    window.addEventListener('touchstart', this.resetTimer);
    window.addEventListener('scroll', this.resetTimer);
  }

  private resetTimer = () => {
    this.ngZone.runOutsideAngular(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.handleInactivity();
      }, this.timeoutInMs);
    });
  };

  private handleInactivity() {
    console.log('Usuário inativo por 3 horas. Limpando localStorage.');
    localStorage.clear();
    // Opcional: redirecionar para tela de login
    window.location.href = '/login';
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.resetTimer);
    window.removeEventListener('mousedown', this.resetTimer);
    window.removeEventListener('keypress', this.resetTimer);
    window.removeEventListener('touchstart', this.resetTimer);
    window.removeEventListener('scroll', this.resetTimer);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
