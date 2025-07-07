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
import { RockPaperScissorsComponent } from '../rock-paper-scissors/rock-paper-scissors.component';
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
  private draggingApp: DesktopApp | null = null;
  private iconOffset = { x: 0, y: 0 };
  private draggingWindow: WindowInstance | null = null;
  private dragOffset = { x: 0, y: 0 };

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
    { id: 'calendar', name: '', icon: '', componentSelector: 'app-calendar' },
    { id: 'settings', name: '', icon: '', componentSelector: 'app-settings' },
    {
      id: 'gamecenter',
      name: 'Game Center',
      icon: '🎮',
      componentSelector: 'app-game-center',
    },
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
    rps: RockPaperScissorsComponent,
  };

  constructor(private windowService: WindowManagerService) {}

  ngOnInit(): void {
    const bg = sessionStorage.getItem('selectedBackground');
    if (bg) {
      document.body.style.backgroundImage = `url(${bg})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    } else {
      document.body.style.backgroundImage = `url(Background.png)`;
    }

    const savedPositions = sessionStorage.getItem('desktopAppPositions');
    if (savedPositions) {
      const parsed = JSON.parse(savedPositions);
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
    const iconSize = 100;
    const margin = 40;
    const screenWidth = window.innerWidth;
    const iconsPerRow = Math.floor((screenWidth - margin) / iconSize);

    this.apps.forEach((app, index) => {
      const row = Math.floor(index / iconsPerRow);
      const col = index % iconsPerRow;
      app.position = {
        x: margin + col * iconSize,
        y: margin + row * iconSize,
      };
    });
  }

  onWindowResize = () => {
    const savedPositions = sessionStorage.getItem('desktopAppPositions');
    if (!savedPositions) {
      this.assignGridPositions();
    }

    this.openWindows = this.openWindows.map((win) =>
      win.isMaximized
        ? {
            ...win,
            size: {
              width: window.innerWidth,
              height: window.innerHeight - 40,
            },
          }
        : win
    );
  };

  openApp(app: DesktopApp): void {
    const exists = this.openWindows.find((w) => w.id === app.id);
    if (exists) return this.focusWindow(app.id);

    this.openWindows.push({
      id: app.id,
      title: app.name,
      componentId: app.id,
      isMinimized: false,
      isMaximized: true,
      position: { x: 0, y: 0 },
      size: {
        width: window.innerWidth,
        height: window.innerHeight - 40,
      },
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
            position: !w.isMaximized ? { x: 0, y: 0 } : { x: 100, y: 100 },
            size: !w.isMaximized
              ? { width: window.innerWidth, height: window.innerHeight - 40 }
              : { width: 800, height: 500 },
          }
        : w
    );
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
    this.draggingApp.position = {
      x: event.clientX - this.iconOffset.x,
      y: event.clientY - this.iconOffset.y,
    };
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
    this.draggingWindow.position.x = event.clientX - this.dragOffset.x;
    this.draggingWindow.position.y = event.clientY - this.dragOffset.y;
  };

  stopDrag = () => {
    this.draggingWindow = null;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  };

  private resizingWindow: WindowInstance | null = null;
  private resizeOffset = { x: 0, y: 0 };

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
