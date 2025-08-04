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
