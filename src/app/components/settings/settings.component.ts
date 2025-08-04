import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WindowManagerService } from '../../services/window-manager.service';

type ToggleableBoolean = 'isAnimated' | 'darkMode' | 'notifications';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  activeSection: string = 'display';
  isAnimated: boolean = true;
  darkMode: boolean = false;
  notifications: boolean = true;
  volume: number = 75;

  constructor(private windowService: WindowManagerService) {}

  setBackground(url: string) {
    this.selectedBackground = url;
    this.windowService.setBackground(url);
  }

  settingSections = [
    { id: 'display', name: 'Display & Appearance' },
    { id: 'personalization', name: 'Personalization' },
    { id: 'sound', name: 'Sound' },
    { id: 'notifications', name: 'Notifications' },
  ];

  personalizationBackgrounds = [
    {
      id: 'dark-circuit',
      name: 'Dark + Circuit + Minimal',
      url: 'dark-circuit.png',
    },
    {
      id: 'gradient-name',
      name: 'Gradient Tech + My Name',
      url: 'gradient-name.png',
    },
    {
      id: 'futuristic-india',
      name: 'Futuristic + Indian Vibes',
      url: 'futuristic-india.png',
    },
    {
      id: 'desk-coding',
      name: 'Desk Setup with Code',
      url: 'desk-coding.png',
    },
    {
      id: 'ai-neural',
      name: 'AI + Neural Style',
      url: 'ai-neural.png',
    },
  ];

  selectedBackground: string = '';

  ngOnInit(): void {
    const savedBg = sessionStorage.getItem('selectedBackground');
    const savedDarkMode = sessionStorage.getItem('darkMode');
    const savedVolume = sessionStorage.getItem('volume');

    this.selectedBackground = savedBg || this.personalizationBackgrounds[0].url;
    this.darkMode = savedDarkMode === 'true';
    this.volume = savedVolume ? parseInt(savedVolume) : 75;

    this.applyBackground();
    this.applyDarkMode();
  }

  applyBackground() {
    document.body.style.backgroundImage = `url(${this.selectedBackground})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
  }

  setActiveSection(id: string) {
    this.activeSection = id;
  }

  toggle(setting: ToggleableBoolean) {
    this[setting] = !this[setting];
    if (setting === 'darkMode') {
      sessionStorage.setItem('darkMode', String(this.darkMode));
      this.applyDarkMode();
    }
  }

  applyDarkMode() {
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  onVolumeChange() {
    sessionStorage.setItem('volume', String(this.volume));
  }
}
