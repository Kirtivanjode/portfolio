import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Hobby {
  id: number;
  name: string;
  icon: string;
  level: number;
  xp: number;
  maxXp: number;
  description: string;
  achievements: string[];
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-hobbies',
  imports: [CommonModule, FormsModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
})
export class HobbiesComponent {
  selectedHobby: number | null = null;
  achievements: Set<number> = new Set([1, 3, 5]);

  hobbies: Hobby[] = [
    {
      id: 1,
      name: 'Photography',
      icon: '📸',
      level: 85,
      xp: 2340,
      maxXp: 3000,
      description: 'Capturing moments through the lens.',
      achievements: ['First Photo', '100 Shots', 'Golden Hour Master'],
      color: '#ce93d8',
      bgColor: '#f3e5f5',
    },
    {
      id: 2,
      name: 'Music Production',
      icon: '🎧',
      level: 72,
      xp: 1890,
      maxXp: 2500,
      description: 'Creating beats in my home studio.',
      achievements: ['First Track', 'Beat Maker', 'Mix Master'],
      color: '#90caf9',
      bgColor: '#e3f2fd',
    },
    {
      id: 3,
      name: 'Gaming',
      icon: '🎮',
      level: 94,
      xp: 4200,
      maxXp: 4500,
      description: 'Exploring virtual worlds.',
      achievements: ['Gamer', 'Pro Player', 'Champion'],
      color: '#a5d6a7',
      bgColor: '#e8f5e9',
    },
    {
      id: 4,
      name: 'Reading',
      icon: '📚',
      level: 68,
      xp: 1560,
      maxXp: 2200,
      description: 'Diving into sci-fi and tech books.',
      achievements: ['Bookworm', 'Speed Reader', 'Scholar'],
      color: '#ffcc80',
      bgColor: '#fff3e0',
    },
    {
      id: 5,
      name: 'Travel',
      icon: '✈️',
      level: 76,
      xp: 2100,
      maxXp: 2800,
      description: 'Exploring new cultures.',
      achievements: ['Explorer', 'Globetrotter', 'Culture Seeker'],
      color: '#80deea',
      bgColor: '#e0f7fa',
    },
    {
      id: 6,
      name: 'Coffee Brewing',
      icon: '☕',
      level: 82,
      xp: 2650,
      maxXp: 3200,
      description: 'Perfecting the art of coffee.',
      achievements: ['Barista', 'Roast Master', 'Connoisseur'],
      color: '#ffe082',
      bgColor: '#fff8e1',
    },
  ];

  toggleHobby(id: number) {
    this.selectedHobby = this.selectedHobby === id ? null : id;
  }

  get totalXP(): number {
    return this.hobbies.reduce((acc, hobby) => acc + hobby.xp, 0);
  }

  getHobbyById(id: number): Hobby | null {
    return this.hobbies.find((h) => h.id === id) || null;
  }

  get avgLevel(): number {
    return Math.round(
      this.hobbies.reduce((acc, hobby) => acc + hobby.level, 0) /
        this.hobbies.length
    );
  }
}
