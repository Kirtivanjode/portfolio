import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MascotMessage {
  text: string;
  action?: string;
  route?: string;
}

@Component({
  selector: 'app-mascot',
  imports: [],
  templateUrl: './mascot.component.html',
  styleUrl: './mascot.component.css',
})
export class MascotComponent implements OnInit, OnDestroy {
  @Input() page: string = '';

  isHidden = false;
  showMessage = false;
  currentMessage: MascotMessage | null = null;
  isTalking = false;
  isWaving = false;
  isPointing = false;
  isBlinking = false;

  private messageTimeout: any;
  private animationTimeout: any;

  pageMessages: { [key: string]: MascotMessage[] } = {
    about: [
      {
        text: "Hi there! 👋 Welcome to my portfolio! I'm your friendly guide.",
        action: "Let's explore!",
      },
      {
        text: 'This is where you can learn about me through a fun WhatsApp-style chat!',
        action: 'Start chatting',
      },
      {
        text: "Don't forget to check out my other sections using the sidebar!",
        action: 'Explore more',
        route: 'projects',
      },
    ],
    projects: [
      { text: 'Welcome to my project gallery! 📸', action: 'View projects' },
      {
        text: 'Click on any project to see more details, just like Instagram!',
        action: 'Got it!',
      },
      {
        text: 'Want to see my work experience next?',
        action: 'View Experience',
        route: 'experience',
      },
    ],
    experience: [
      { text: "Here's my professional journey! 💼", action: 'Explore' },
      {
        text: 'This LinkedIn-style layout shows my career progression.',
        action: 'Nice!',
      },
      {
        text: 'Ready to check out my skills?',
        action: 'View Skills',
        route: 'skills',
      },
    ],
    skills: [
      { text: 'Welcome to my skill file manager! 📁', action: 'Browse skills' },
      {
        text: 'Navigate through folders to explore my technical abilities.',
        action: 'Cool!',
      },
      {
        text: 'Want to play some games?',
        action: 'Play Games',
        route: 'games',
      },
    ],
    games: [
      { text: 'Time for some fun! 🎮', action: "Let's play!" },
      {
        text: "Try out these games I've built. Have fun!",
        action: 'Start gaming',
      },
      {
        text: 'Need a break? Check out my hobbies!',
        action: 'View Hobbies',
        route: 'hobbies',
      },
    ],
    hobbies: [
      { text: 'Discover my interests and achievements! 🏆', action: 'Explore' },
      {
        text: 'This gaming-style interface shows what I love doing.',
        action: 'Awesome!',
      },
      {
        text: 'Ready to see my resume?',
        action: 'View Resume',
        route: 'resume',
      },
    ],
    resume: [
      { text: "Here's my professional resume! 📄", action: 'Review' },
      {
        text: 'You can download or print it just like in Microsoft Word.',
        action: 'Download',
        route: 'download',
      },
      { text: 'Want to get in touch?', action: 'Contact Me', route: 'contact' },
    ],
    contact: [
      { text: "Let's connect! 📞", action: 'Get in touch' },
      {
        text: 'Fill out the form or use any of the contact methods shown.',
        action: 'Perfect!',
      },
      {
        text: 'Thanks for visiting my portfolio! 🙏',
        action: "You're welcome!",
      },
    ],
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.startBlinking();
    this.showWelcomeMessage();
  }

  ngOnDestroy() {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.showPageMessage();
    }, 1000);
  }

  showPageMessage() {
    const messages = this.pageMessages[this.page] || this.pageMessages['about'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    this.currentMessage = randomMessage;
    this.showMessage = true;
    this.startTalking();

    this.messageTimeout = setTimeout(() => {
      this.hideMessage();
    }, 8000);
  }

  showHelp() {
    this.hideMessage();
    setTimeout(() => {
      this.currentMessage = {
        text: "I'm here to help you navigate! Click on the sidebar items to explore different sections, or click on me for tips!",
        action: 'Thanks!',
      };
      this.showMessage = true;
      this.startWaving();
    }, 300);
  }

  toggleMascot() {
    this.isHidden = !this.isHidden;
    if (!this.isHidden) {
      this.showPageMessage();
    } else {
      this.hideMessage();
    }
  }

  performAction(message: MascotMessage) {
    if (message.route) {
      if (message.route === 'download') {
        window.print();
      } else {
        this.router.navigate([message.route]);
      }
    }
    this.hideMessage();
  }

  hideMessage() {
    this.showMessage = false;
    this.stopAnimations();
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
  }

  startTalking() {
    this.isTalking = true;
    this.animationTimeout = setTimeout(() => (this.isTalking = false), 2000);
  }

  startWaving() {
    this.isWaving = true;
    this.animationTimeout = setTimeout(() => (this.isWaving = false), 3000);
  }

  startPointing() {
    this.isPointing = true;
    this.animationTimeout = setTimeout(() => (this.isPointing = false), 4000);
  }

  startBlinking() {
    setInterval(() => {
      this.isBlinking = true;
      setTimeout(() => (this.isBlinking = false), 300);
    }, 3000 + Math.random() * 2000);
  }

  stopAnimations() {
    this.isTalking = false;
    this.isWaving = false;
    this.isPointing = false;
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
  }
}
