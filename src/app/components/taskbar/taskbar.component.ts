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

  searchQuery: string = '';
  showSuggestions = false;
  filteredApps: any[] = [];
  selectedIndex = 0;
  currentTime: string = '';

  ngOnInit() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);

    this.filteredApps = [...this.apps];
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
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredApps = [...this.apps];
    this.showSuggestions = false;
    this.selectedIndex = 0;
  }

  getAppIcon(id: string): string {
    return this.apps.find((a) => a.id === id)?.icon || '❓';
  }

  select(win: any) {
    this.selectWindow.emit(win);
  }

  triggerOpenApp(app: any) {
    this.openApp.emit(app);
  }

  triggerOpenAppById(id: string) {
    this.openAppById.emit(id);
  }
}
