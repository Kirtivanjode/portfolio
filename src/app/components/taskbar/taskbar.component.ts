import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css'],
})
export class TaskbarComponent {
  @Input() apps: any[] = [];
  @Input() openedWindows: any[] = [];

  @Output() openApp = new EventEmitter<any>();
  @Output() openAppById = new EventEmitter<string>();
  @Output() selectWindow = new EventEmitter<any>();
  @Output() toggleMinimize = new EventEmitter<string>();

  searchQuery: string = '';
  showSuggestions = false;
  filteredApps: any[] = [];
  selectedIndex = 0;
  currentTime: string = '';

  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, 1000);

    this.filteredApps = [...this.apps];
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);

    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  filterApps() {
    const q = this.searchQuery.toLowerCase();
    this.filteredApps = this.apps.filter((app) =>
      app.name.toLowerCase().includes(q)
    );
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredApps.length;
    } else if (event.key === 'ArrowUp') {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.filteredApps.length) %
        this.filteredApps.length;
    } else if (event.key === 'Enter') {
      const app = this.filteredApps[this.selectedIndex];
      if (app) {
        this.triggerOpenApp(app);
        this.clearSearch();
      }
    } else if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredApps = [...this.apps];
    this.showSuggestions = false;
    this.selectedIndex = 0;
  }

  handleClickOutside(event: any) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-bar')) {
      this.showSuggestions = false;
    }
  }

  getAppIcon(id: string): string {
    const fallback: Record<string, string> = {
      calendar: '📅',
      settings: '⚙️',
    };

    const app = this.apps.find((a) => a.id === id);
    return app?.icon || fallback[id] || '❓';
  }

  select(win: any) {
    this.selectWindow.emit(win);
  }

  isAppOpen(appId: string): boolean {
    return this.openedWindows.some((w) => w.id === appId && !w.isMinimized);
  }

  triggerOpenApp(app: any) {
    this.openApp.emit(app);
  }

  triggerOpenAppById(id: string) {
    this.openAppById.emit(id);
  }
}
