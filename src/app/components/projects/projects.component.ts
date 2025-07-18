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
      title: '',
      description: '',
      image: '',
      likes: 1,
      comments: 1,
      tech: [],
      github: '',
      demo: '',
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
