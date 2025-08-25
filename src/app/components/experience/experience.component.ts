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
      company: 'Hi-Mak',
      position: 'Intern',
      duration: 'March 2024 – June 2024',
      location: 'Vadodara, Gujarat',
      description:
        'Worked as a software development intern at Hi-Mak, contributing to frontend and backend modules while collaborating with senior developers on real-world projects.',
      achievements: [
        'Developed and optimized responsive UI components in Angular',
        'Improved code quality by following TypeScript best practices',
      ],
      skills: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL'],
      logo: 'assets/companies/himak.png',
      connections: 0,
    },
  ];
}
