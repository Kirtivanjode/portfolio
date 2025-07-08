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

  setBackground(bg: string): void {
    this.bgSubject.next(bg);
    sessionStorage.setItem('selectedBackground', bg);
  }

  getBackground(): string {
    return this.bgSubject.value;
  }

  // ✅ App launcher logic
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
