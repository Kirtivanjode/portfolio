import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ResumeComponent } from '../resume/resume.component';
import { HobbiesComponent } from '../hobbies/hobbies.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SettingsComponent } from '../settings/settings.component';
import { TaskbarComponent } from '../taskbar/taskbar.component';
import { GameCenterComponent } from '../game-center/game-center.component';
import { MemoryMatchComponent } from '../memory-match/memory-match.component';
import { TicTacToeComponent } from '../tic-tac-toe/tic-tac-toe.component';
import { CalendarComponent } from '../calendar/calendar.component';

import { WindowManagerService } from '../../services/window-manager.service';

interface DesktopApp {
  id: string;
  name: string;
  icon: string;
  componentSelector: string;
  position?: { x: number; y: number };
}

interface WindowInstance {
  id: string;
  title: string;
  componentId: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

@Component({
  selector: 'app-window',
  standalone: true,
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  imports: [CommonModule, FormsModule, TaskbarComponent],
})
export class WindowComponent implements OnInit {
  openWindows: WindowInstance[] = [];
  highestZIndex = 1000;
  currentBackground = 'desk-coding.png';

  apps: DesktopApp[] = [
    {
      id: 'about',
      name: 'About Me',
      icon: '👤',
      componentSelector: 'app-about-me',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: '💼',
      componentSelector: 'app-projects',
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: '📄',
      componentSelector: 'app-experience',
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: '📥',
      componentSelector: 'app-resume',
    },
    {
      id: 'hobbies',
      name: 'Hobbies',
      icon: '🎨',
      componentSelector: 'app-hobbies',
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: '📁',
      componentSelector: 'app-skills',
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '✉️',
      componentSelector: 'app-contact',
    },
    {
      id: 'gamecenter',
      name: 'Game Center',
      icon: '🎮',
      componentSelector: 'app-game-center',
    },
    { id: 'calendar', name: '', icon: '', componentSelector: 'app-calendar' },
    { id: 'settings', name: '', icon: '', componentSelector: 'app-settings' },
  ];

  componentMap: Record<string, any> = {
    about: AboutMeComponent,
    projects: ProjectsComponent,
    experience: ExperienceComponent,
    resume: ResumeComponent,
    hobbies: HobbiesComponent,
    skills: SkillsComponent,
    contact: ContactComponent,
    settings: SettingsComponent,
    calendar: CalendarComponent,
    gamecenter: GameCenterComponent,
    'tic-tac-toe': TicTacToeComponent,
    'memory-match': MemoryMatchComponent,
  };

  constructor(private windowService: WindowManagerService) {}

  ngOnInit(): void {
    this.windowService.background$.subscribe((bg) => {
      this.currentBackground = bg;
      document.body.style.backgroundImage = `url(${bg})`;
    });

    const saved = sessionStorage.getItem('desktopAppPositions');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.forEach(({ id, position }: any) => {
        const app = this.apps.find((a) => a.id === id);
        if (app) app.position = position;
      });
    } else {
      this.assignGridPositions();
    }

    window.addEventListener('resize', this.onWindowResize);
    this.windowService.registerLauncher((id: string) => this.openAppById(id));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
  }

  assignGridPositions() {
    const leftColumnX = 20;
    const rightColumnX = 110;
    const startY = 50;
    const rowHeight = 150;

    this.apps.forEach((app, index) => {
      const col = index % 2 === 0 ? leftColumnX : rightColumnX;
      const row = Math.floor(index / 2);
      app.position = { x: col, y: startY + row * rowHeight };
    });
  }

  onWindowResize = () => {
    if (!sessionStorage.getItem('desktopAppPositions'))
      this.assignGridPositions();

    this.openWindows = this.openWindows.map((win) =>
      win.isMaximized
        ? {
            ...win,
            size: { width: window.innerWidth, height: window.innerHeight - 40 },
          }
        : win
    );
  };

  openApp(app: DesktopApp): void {
    if (this.openWindows.some((w) => w.id === app.id))
      return this.focusWindow(app.id);

    this.openWindows.push({
      id: app.id,
      title: app.name,
      componentId: app.id,
      isMinimized: false,
      isMaximized: true,
      position: { x: 0, y: 0 },
      size: { width: window.innerWidth, height: window.innerHeight - 40 },
      zIndex: ++this.highestZIndex,
    });
  }

  closeWindow(id: string) {
    this.openWindows = this.openWindows.filter((w) => w.id !== id);
  }

  minimizeWindow(id: string) {
    this.openWindows = this.openWindows.map((w) =>
      w.id === id ? { ...w, isMinimized: true } : w
    );
  }

  maximizeWindow(id: string) {
    this.openWindows = this.openWindows.map((w) =>
      w.id === id
        ? {
            ...w,
            isMaximized: !w.isMaximized,
            position: !w.isMaximized ? { x: 0, y: 0 } : { x: 0, y: 0 },
            size: !w.isMaximized
              ? { width: window.innerWidth, height: window.innerHeight - 40 }
              : { width: 800, height: 500 },
          }
        : w
    );
  }

  toggleWindowMinimize(id: string) {
    const win = this.openWindows.find((w) => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      this.focusWindow(id);
    } else {
      this.minimizeWindow(id);
    }
  }

  focusWindow(id: string) {
    this.openWindows = this.openWindows.map((w) =>
      w.id === id
        ? { ...w, isMinimized: false, zIndex: ++this.highestZIndex }
        : w
    );
  }

  openAppById(id: string) {
    const app = this.apps.find((a) => a.id === id);
    if (app) this.openApp(app);
  }

  isVisible(win: WindowInstance): boolean {
    return !win.isMinimized;
  }

  draggingApp: DesktopApp | null = null;
  iconOffset = { x: 0, y: 0 };

  startAppDrag(event: MouseEvent, app: DesktopApp) {
    event.preventDefault();
    this.draggingApp = app;
    this.iconOffset = {
      x: event.clientX - (app.position?.x ?? 0),
      y: event.clientY - (app.position?.y ?? 0),
    };
    document.addEventListener('mousemove', this.onAppDrag);
    document.addEventListener('mouseup', this.stopAppDrag);
  }

  onAppDrag = (event: MouseEvent) => {
    if (!this.draggingApp) return;
    const newX = event.clientX - this.iconOffset.x;
    const newY = event.clientY - this.iconOffset.y;

    const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 80));
    const clampedY = Math.max(0, Math.min(newY, window.innerHeight - 80));

    this.draggingApp.position = { x: clampedX, y: clampedY };
  };

  stopAppDrag = () => {
    if (this.draggingApp) {
      sessionStorage.setItem(
        'desktopAppPositions',
        JSON.stringify(
          this.apps.map((app) => ({
            id: app.id,
            position: app.position,
          }))
        )
      );
    }

    this.draggingApp = null;
    document.removeEventListener('mousemove', this.onAppDrag);
    document.removeEventListener('mouseup', this.stopAppDrag);
  };

  draggingWindow: WindowInstance | null = null;
  dragOffset = { x: 0, y: 0 };

  startDrag(event: MouseEvent, win: WindowInstance) {
    event.preventDefault();
    this.draggingWindow = win;
    this.dragOffset = {
      x: event.clientX - win.position.x,
      y: event.clientY - win.position.y,
    };
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent) => {
    if (!this.draggingWindow) return;

    const newX = event.clientX - this.dragOffset.x;
    const newY = event.clientY - this.dragOffset.y;

    const clampedX = Math.max(
      0,
      Math.min(newX, window.innerWidth - this.draggingWindow.size.width)
    );
    const clampedY = Math.max(
      0,
      Math.min(newY, window.innerHeight - this.draggingWindow.size.height)
    );

    this.draggingWindow.position.x = clampedX;
    this.draggingWindow.position.y = clampedY;
  };

  stopDrag = () => {
    this.draggingWindow = null;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  };

  resizingWindow: WindowInstance | null = null;
  resizeOffset = { x: 0, y: 0 };

  startResize(event: MouseEvent, win: WindowInstance) {
    event.stopPropagation();
    this.resizingWindow = win;
    this.resizeOffset = { x: event.clientX, y: event.clientY };
    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.stopResize);
  }

  onResize = (event: MouseEvent) => {
    if (!this.resizingWindow) return;
    const dx = event.clientX - this.resizeOffset.x;
    const dy = event.clientY - this.resizeOffset.y;
    this.resizingWindow.size.width += dx;
    this.resizingWindow.size.height += dy;
    this.resizeOffset = { x: event.clientX, y: event.clientY };
  };

  stopResize = () => {
    this.resizingWindow = null;
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  clearPositions() {
    sessionStorage.removeItem('desktopAppPositions');
    this.assignGridPositions();
  }
}
