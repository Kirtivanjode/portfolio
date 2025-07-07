import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent {
  downloadResume() {
    const element = document.createElement('a');
    const file = new Blob([''], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = 'Alex_Johnson_Resume.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
