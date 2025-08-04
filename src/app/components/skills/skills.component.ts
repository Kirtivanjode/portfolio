import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SkillItem {
  id: string;
  name: string;
  level: number;
  icon: string;
  description: string; // Add this
}

interface SkillFolder {
  id: string;
  name: string;
  children: SkillItem[];
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  expandedFolders = new Set<string>(['frontend', 'backend']);
  selectedFile: string | null = null;

  skillsData: SkillFolder[] = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      children: [
        {
          id: 'html',
          name: 'HTML',
          level: 95,
          icon: '📄',
          description:
            'Semantic markup language forming the backbone of web content. Mastery includes accessibility best practices (ARIA), SEO structuring, and clean separation of concerns for scalable frontend architectures.',
        },
        {
          id: 'css',
          name: 'CSS',
          level: 92,
          icon: '🎨',
          description:
            'Advanced in modern layout systems like Flexbox and Grid, responsive design, CSS variables, and utility-first frameworks (e.g., Tailwind). Proficient in creating maintainable design systems and theming strategies using SCSS or PostCSS.',
        },
        {
          id: 'js',
          name: 'JavaScript',
          level: 90,
          icon: '🟨',
          description:
            'Expert in asynchronous programming (Promises, async/await), ES6+ syntax, modular architecture, DOM manipulation, and design patterns. Skilled at integrating third-party APIs, optimizing performance, and debugging with developer tools.',
        },
        {
          id: 'angular',
          name: 'Angular',
          level: 95,
          icon: '🅰️',
          description:
            'Advanced experience with Angular CLI, RxJS, state management (NgRx), and modular scalable architecture for SPAs. Skilled in lazy loading, dynamic components, and dependency injection patterns.',
        },
      ],
    },
    {
      id: 'backend',
      name: 'Backend Development',
      children: [
        {
          id: 'node',
          name: 'Node.js',
          level: 88,
          icon: '🟢',
          description:
            'Deep understanding of event-driven, non-blocking I/O for high-performance APIs. Experienced in building production-ready RESTful and real-time applications using cluster mode, streams, and worker threads for scalability.',
        },
        {
          id: 'express',
          name: 'Express.js',
          level: 85,
          icon: '🚀',
          description:
            'Proficient in middleware architecture, route handling, request validation, and REST API design. Familiar with security best practices (CORS, rate limiting, JWT, Helmet), request lifecycle, and modular controller-based structures.',
        },
        {
          id: 'mysql',
          name: 'MySQL',
          level: 80,
          icon: '🗃️',
          description:
            'Skilled in advanced SQL querying (joins, subqueries, CTEs), database normalization, indexing strategies, and stored procedures. Able to design relational schemas, optimize queries for performance, and integrate with ORMs like Sequelize or Knex.js.',
        },
      ],
    },
  ];

  toggleFolder(id: string) {
    this.expandedFolders.has(id)
      ? this.expandedFolders.delete(id)
      : this.expandedFolders.add(id);
  }

  selectFile(id: string) {
    this.selectedFile = this.selectedFile === id ? null : id;
  }

  get selectedSkill(): SkillItem | undefined {
    for (const folder of this.skillsData) {
      const match = folder.children.find((s) => s.id === this.selectedFile);
      if (match) return match;
    }
    return undefined;
  }

  getStars(level: number): string {
    const stars = Math.floor(level / 20);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }
}
