// src/app/services/window-manager.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowManagerService {
  private launcher: ((id: string) => void) | null = null;

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
