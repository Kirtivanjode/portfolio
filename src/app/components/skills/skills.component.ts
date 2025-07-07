import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface SkillItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  level?: number;
  experience?: string;
  children?: SkillItem[];
  icon?: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  expandedFolders = new Set<string>(['frontend', 'backend']);
  selectedFile: string | null = null;
  searchTerm: string = '';

  skillsData: SkillItem[] = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      type: 'folder',
      children: [
        {
          id: 'react',
          name: 'React.js',
          type: 'file',
          level: 95,
          experience: '4 years',
          icon: '⚛️',
        },
        {
          id: 'vue',
          name: 'Vue.js',
          type: 'file',
          level: 85,
          experience: '3 years',
          icon: '💚',
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          type: 'file',
          level: 90,
          experience: '3 years',
          icon: '🔷',
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          type: 'file',
          level: 92,
          experience: '2 years',
          icon: '🎨',
        },
      ],
    },
    {
      id: 'backend',
      name: 'Backend Development',
      type: 'folder',
      children: [
        {
          id: 'node',
          name: 'Node.js',
          type: 'file',
          level: 88,
          experience: '4 years',
          icon: '🟢',
        },
        {
          id: 'express',
          name: 'Express.js',
          type: 'file',
          level: 85,
          experience: '3 years',
          icon: '🚀',
        },
      ],
    },
  ];

  toggleFolder(id: string) {
    if (this.expandedFolders.has(id)) {
      this.expandedFolders.delete(id);
    } else {
      this.expandedFolders.add(id);
    }
  }

  selectFile(id: string) {
    this.selectedFile = this.selectedFile === id ? null : id;
  }

  get selectedSkill(): SkillItem | undefined {
    for (const folder of this.skillsData) {
      const match = folder.children?.find(
        (child) => child.id === this.selectedFile
      );
      if (match) return match;
    }
    return undefined;
  }

  getStars(level: number): string {
    const stars = Math.floor(level / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }
}
