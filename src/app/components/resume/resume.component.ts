import { Component } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  downloadResume() {
    const element = document.querySelector('.resume-doc') as HTMLElement;
    if (!element) {
      console.error('Resume element not found!');
      return;
    }

    const options = {
      margin: 0.5,
      filename: 'Kirti_Vanjode_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
  }
}
