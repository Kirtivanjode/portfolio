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
      title: 'E-Commerce Platform',
      description:
        'Full-stack online store with React, Node.js, and Stripe integration',
      image:
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 124,
      comments: 23,
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 2,
      title: 'Task Management App',
      description:
        'Beautiful productivity app with drag-and-drop functionality',
      image:
        'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 89,
      comments: 12,
      tech: ['React', 'TypeScript', 'Tailwind', 'Firebase'],
      github: 'https://github.com',
      demo: 'https://demo.com',
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
