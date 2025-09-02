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
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  likedPosts = new Set<number>();

  toggleLike(projectId: number) {
    if (this.likedPosts.has(projectId)) {
      this.likedPosts.delete(projectId);
    } else {
      this.likedPosts.add(projectId);
    }
  }

  projects: Project[] = [
    {
      id: 1,
      title: '👥 EmployeeHub',
      description:
        'A responsive employee management dashboard with CRUD operations. Built with Angular + Bootstrap, modular architecture.',
      image: 'project-1.png',
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      github: 'https://github.com/Kirtivanjode/Employeehub',
      demo: 'https://employeehubki.vercel.app',
      loginId: 'john.doe@company.com',
      password: '12345',
      username: 'employeehub',
      featured: true,
    },
    {
      id: 2,
      title: '📊 Live Dashboard',
      description:
        'Real-time metrics dashboard with interactive charts, KPI cards, dark/light mode. Built with Angular + TypeScript.',
      image: 'project-2.png',
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      github: 'https://github.com/Kirtivanjode/livechart',
      demo: 'https://livechartt.vercel.app/',
    },
    {
      id: 3,
      title: '🌍 Wander With KI',
      description:
        'Travel blogging app with photo posts, likes, comments, and a wishlist bucket list. Integrated Leaflet map and Node.js/Express backend.',
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
      featured: true,
    },
  ];
}
