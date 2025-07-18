import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  logo: string;
  connections: number;
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      id: 1,
      company: '',
      position: '',
      duration: '',
      location: '',
      description: '',
      achievements: [],
      skills: ['Angular', 'Node.js', 'TypeScript'],
      logo: '',
      connections: 127,
    },
  ];
}
