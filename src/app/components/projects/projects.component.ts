import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  loginId?: string;
  password?: string;
  username?: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  likedPosts = new Set<number>();

  projects: Project[] = [
    {
      id: 1,
      title: '👥 EmployeeHub',
      description:
        'A responsive employee management dashboard with CRUD operations. Includes UI for viewing, adding, editing, and deleting employee records. Built with Angular + Bootstrap and a service-driven architecture for modularity.',
      image: 'project-1.png',
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      github: 'https://github.com/Kirtivanjode/Employeehub',
      demo: 'https://employeehubki.vercel.app',
      loginId: 'john.doe@company.com',
      password: '12345',
      username: 'employeehub',
    },
    {
      id: 2,
      title: '📊 Live Dashboard',
      description:
        'A real-time metrics dashboard with interactive charts, colorful KPI cards, and a sleek dark/light UI. Built in Angular with TypeScript, it consumes mock APIs and supports scalable service-based architecture.',
      image: 'project-2.png',
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      github: 'https://github.com/Kirtivanjode/livechart',
      demo: 'https://livechartt.vercel.app/',
      loginId: 'admin@company.com',
      password: '12345',
      username: 'livechart_admin',
    },
    {
      id: 3,
      title: '🌍 Wander With KI',
      description:
        'A travel blogging app with photo posts, likes, comments, and a wishlist “bucket list.” It integrates map-based exploration using Leaflet and stores travel data in a Node/Express backend with PostgreSQL.',
      image: 'project-3.png',
      tech: [
        'Angular',
        'TypeScript',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'Leaflet',
      ],
      github: 'https://github.com/Kirtivanjode/wanderwithkii',
      demo: 'https://wanderwithki.vercel.app/',
      loginId: 'admin@123',
      password: '12345',
      username: 'wander_with_ki',
    },
  ];
}
