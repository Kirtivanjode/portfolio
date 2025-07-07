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
      company: 'TechCorp Solutions',
      position: 'Senior Full Stack Developer',
      duration: '2022 - Present',
      location: 'San Francisco, CA',
      description:
        'Lead a team of 5 developers building scalable web apps. Implemented microservices architecture with 40% performance improvement.',
      achievements: [
        'Architected and deployed 3 major web applications',
        'Reduced deployment time by 60% through CI/CD optimization',
        'Mentored 3 junior developers',
      ],
      skills: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript'],
      logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      connections: 127,
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      duration: '2020 - 2022',
      location: 'Remote',
      description:
        'Developed and maintained multiple client projects. Built responsive web applications from concept to deployment.',
      achievements: [
        'Delivered 15+ client projects on time and within budget',
        'Increased client satisfaction scores by 25%',
        'Implemented automated testing reducing bugs by 50%',
      ],
      skills: ['Vue.js', 'Python', 'MongoDB', 'Git', 'Agile'],
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      connections: 89,
    },
    {
      id: 3,
      company: 'Digital Agency Pro',
      position: 'Frontend Developer',
      duration: '2019 - 2020',
      location: 'New York, NY',
      description:
        'Specialized in creating beautiful, responsive user interfaces. Collaborated with designers and backend developers.',
      achievements: [
        'Redesigned company website increasing traffic by 35%',
        'Developed reusable component library',
        'Improved page load speeds by 45%',
      ],
      skills: ['JavaScript', 'CSS3', 'HTML5', 'Sass', 'Webpack'],
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      connections: 156,
    },
  ];
}
