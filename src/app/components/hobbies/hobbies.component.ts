import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Hobby {
  id: string;
  name: string;
  icon: string;
  level: number;
  xp: number;
  maxXp: number;
  color: string;
  bgColor: string;
  description: string;
  achievements: string[];
}

@Component({
  selector: 'app-hobbies',
  imports: [CommonModule, FormsModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
})
export class HobbiesComponent implements OnInit {
  hobbies: Hobby[] = [];
  selectedHobby: string | null = null;
  achievements: string[] = [];
  avgLevel: number = 0;
  totalXP: number = 0;

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.calculateStats();
  }

  loadFromLocalStorage(): void {
    const data = localStorage.getItem('my-hobbies');
    if (data) {
      this.hobbies = JSON.parse(data);
    } else {
      this.hobbies = this.getDefaultHobbies();
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('my-hobbies', JSON.stringify(this.hobbies));
  }

  resetProgress(): void {
    localStorage.removeItem('my-hobbies');
    window.location.reload();
  }

  toggleHobby(id: string): void {
    this.selectedHobby = this.selectedHobby === id ? null : id;
  }

  getHobbyById(id: string): Hobby | undefined {
    return this.hobbies.find((h) => h.id === id);
  }

  calculateStats(): void {
    this.totalXP = this.hobbies.reduce((sum, h) => sum + h.xp, 0);
    this.avgLevel = Math.round(
      this.hobbies.reduce((sum, h) => sum + h.level, 0) / this.hobbies.length
    );
    this.achievements = this.hobbies
      .filter((h) => h.achievements.length > 0)
      .map((h) => h.id);
  }

  getDefaultHobbies(): Hobby[] {
    return [
      {
        id: 'gaming',
        name: 'Gaming',
        icon: '🎮',
        level: 2,
        xp: 150,
        maxXp: 300,
        color: '#3f51b5',
        bgColor: '#e8eaf6',
        description: 'Playing strategy and action games.',
        achievements: ['First Win', '100 Hours Played'],
      },
      {
        id: 'drawing',
        name: 'Drawing',
        icon: '🎨',
        level: 1,
        xp: 80,
        maxXp: 150,
        color: '#e91e63',
        bgColor: '#fce4ec',
        description: 'Sketching characters and nature art.',
        achievements: ['First Sketch', 'Inktober Participant'],
      },
    ];
  }
}
