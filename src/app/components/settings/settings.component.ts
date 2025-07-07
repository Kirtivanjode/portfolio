import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Glow',
      url: 'cyberpunk.png',
    },
  ];

  selectedBackground: string = '';

  ngOnInit(): void {
    const savedBg = sessionStorage.getItem('selectedBackground');
    this.selectedBackground = savedBg || this.personalizationBackgrounds[0].url;
    document.body.style.backgroundImage = `url(${this.selectedBackground})`;
  }

  setActiveSection(id: string) {
    this.activeSection = id;
  }

  toggle(setting: ToggleableBoolean) {
    this[setting] = !this[setting];
  }

  setBackground(url: string) {
    this.selectedBackground = url;
    sessionStorage.setItem('selectedBackground', url);
    document.body.style.backgroundImage = `url(${url})`;
  }
}
