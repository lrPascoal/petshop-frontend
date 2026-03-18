// src/app/services/theme.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    private darkModeSignal = signal<boolean>(this.getInitialTheme());

  darkMode = this.darkModeSignal.asReadonly();

  constructor() {
    this.applyTheme(this.darkModeSignal());
  }

  toggleTheme() {
    this.darkModeSignal.update(val => !val);
    this.applyTheme(this.darkModeSignal());
    localStorage.setItem('user-theme', this.darkModeSignal() ? 'dark' : 'light');
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem('user-theme');
    return saved === 'dark';
  }

  private applyTheme(isDark: boolean) {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}