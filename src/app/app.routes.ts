import { Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ResumeComponent } from './components/resume/resume.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { GameCenterComponent } from './components/game-center/game-center.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { MemoryMatchComponent } from './components/memory-match/memory-match.component';

export const routes: Routes = [
  { path: 'about', component: AboutMeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'hobbies', component: HobbiesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'games', component: GameCenterComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'memorymatch', component: MemoryMatchComponent },
];
