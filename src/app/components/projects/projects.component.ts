import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  tech: string[];
  github: string;
  demo: string;
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
        'A responsive frontend dashboard for managing employees. Includes UI for viewing, adding, editing, and deleting employee data. Built entirely in Angular with mock data and service-based architecture.',
      image: 'project-1.png',
      likes: 24,
      comments: 5,
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      github: 'https://github.com/Kirtivanjode/Employeehub',
      demo: 'https://employeehubki.vercel.app',
    },
    {
      id: 2,
      title: '📊 Live Dashboard',
      description:
        'A sleek, responsive Angular dashboard for tracking real-time metrics. Features sidebar navigation, colorful KPI cards, and a dark modern UI — built with TypeScript and a service-based architecture.',
      image: 'project-2.png',
      likes: 20,
      comments: 5,
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      github: 'https://github.com/Kirtivanjode/livechart',
      demo: 'https://livechartt.vercel.app/',
    },
    {
      id: 3,
      title: '🌍 Wander With KI',
      description:
        'A travel blogging app with posts, images, likes, comments, wishlist bucket list, and map-based views. Built with Angular + TypeScript on a Node/Express API and PostgreSQL.',
      image: 'wander-with-ki.png', // put this in src/assets/images/
      likes: 73,
      comments: 18,
      tech: [
        'Angular',
        'TypeScript',
        'Express.js',
        'Node.js',
        'PostgreSQL',
        'Leaflet',
      ],
      github: 'https://github.com/Kirtivanjode/wanderwithkii',
      demo: 'https://wanderwithki.vercel.app/',
    },
  ];

  toggleLike(id: number) {
    if (this.likedPosts.has(id)) {
      this.likedPosts.delete(id);
    } else {
      this.likedPosts.add(id);
    }
  }

  isLiked(id: number): boolean {
    return this.likedPosts.has(id);
  }
}
