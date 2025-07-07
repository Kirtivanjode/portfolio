import { Component } from '@angular/core';

import { WindowComponent } from './components/window/window.component';
import { CommonModule } from '@angular/common';
import { TaskbarComponent } from './components/taskbar/taskbar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, WindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
