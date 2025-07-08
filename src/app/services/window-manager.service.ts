// src/app/services/window-manager.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowManagerService {
  private launcher: ((id: string) => void) | null = null;

  // ✅ Background logic
  private bgSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('selectedBackground') || 'desk-coding.png'
  );
  background$ = this.bgSubject.asObservable();

  // Called by SettingsComponent
  setBackground(url: string): void {
    sessionStorage.setItem('selectedBackground', url);
    this.bgSubject.next(url);
  }

  // Used by WindowComponent on init
  getInitialBackground(): string {
    return sessionStorage.getItem('selectedBackground') || 'desk-coding.png';
  }

  // Existing launcher
  registerLauncher(fn: (id: string) => void): void {
    this.launcher = fn;
  }

  launchGame(id: string): void {
    if (this.launcher) {
      this.launcher(id);
    } else {
      console.warn('No launcher registered for games!');
    }
  }
}
