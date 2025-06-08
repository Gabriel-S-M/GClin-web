import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {
    this.trackLastRoute();
  }

  private trackLastRoute(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      localStorage.setItem('lastRoute', event.urlAfterRedirects);
    });
  }

  getLastRoute(): string | null {
    return localStorage.getItem('lastRoute');
  }

  clearLastRoute(): void {
    localStorage.removeItem('lastRoute');
  }
}
