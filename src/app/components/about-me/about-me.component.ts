import {
  Component,
  computed,
  effect,
  ElementRef,
  ViewChild,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChild('chatInput') chatInputRef!: ElementRef<HTMLInputElement>;

  messages = signal<Message[]>(
    JSON.parse(sessionStorage.getItem('chatMessages') || '[]')
  );
  userInput = signal(sessionStorage.getItem('userInput') || '');
  currentStep = signal(Number(sessionStorage.getItem('currentStep') || 0));
  userName = signal(sessionStorage.getItem('userName') || '');

  botMessages = [
    'Hello! 👋 Welcome to my portfolio!',
    "What's your name?",
    (name: string) => `Nice to meet you, ${name}! 😊`,
    'Let me tell you a bit about myself...',
    `I'm Kirti Vanjode, a Full Stack Developer based in India.`,
    "I'm a passionate developer building modern, user-centric web experiences.",
    "I'm passionate about: Frontend, Backend, UI/UX, Performance Tuning",
    'Feel free to explore the other sections to learn more about my work! 🚀',
  ];

  constructor() {
    if (this.currentStep() === 0 && this.messages().length === 0) {
      this.addBotMessage(this.botMessages[0] as string);
      this.currentStep.set(1);
      this.saveSession();
    }

    effect(() => {
      if (
        this.currentStep() === 1 &&
        !this.messages().some((m) => m.text === this.botMessages[1])
      ) {
        setTimeout(
          () => this.addBotMessage(this.botMessages[1] as string),
          1000
        );
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chatInputRef?.nativeElement?.focus();
    }, 100);
  }

  get userInputModel() {
    return this.userInput();
  }

  set userInputModel(val: string) {
    this.userInput.set(val);
    sessionStorage.setItem('userInput', val);
  }

  addBotMessage(text: string) {
    this.messages.update((prev) => [
      ...prev,
      { text, sender: 'bot', timestamp: this.timestamp() },
    ]);
    this.saveSession();
  }

  addUserMessage(text: string) {
    this.messages.update((prev) => [
      ...prev,
      { text, sender: 'user', timestamp: this.timestamp() },
    ]);
    this.saveSession();
  }

  handleSendMessage() {
    const input = this.userInput().trim();
    if (!input) return;

    this.addUserMessage(input);

    if (this.currentStep() === 1) {
      this.userName.set(input);
      this.currentStep.set(2);
      this.userInput.set('');
      this.saveSession();

      setTimeout(
        () => this.addBotMessage((this.botMessages[2] as Function)(input)),
        1000
      );
      setTimeout(() => this.addBotMessage(this.botMessages[3] as string), 2000);
      setTimeout(() => this.addBotMessage(this.botMessages[4] as string), 3000);
      setTimeout(() => this.addBotMessage(this.botMessages[5] as string), 4000);
      setTimeout(() => this.addBotMessage(this.botMessages[6] as string), 5000);
      setTimeout(() => this.addBotMessage(this.botMessages[7] as string), 6000);
    }

    this.userInput.set('');
    this.saveSession();
  }

  timestamp(): string {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  saveSession() {
    sessionStorage.setItem('chatMessages', JSON.stringify(this.messages()));
    sessionStorage.setItem('userInput', this.userInput());
    sessionStorage.setItem('currentStep', this.currentStep().toString());
    sessionStorage.setItem('userName', this.userName());
  }

  messagesList = computed(() => this.messages());
  currentStepValue = computed(() => this.currentStep());
  trackByIndex(index: number) {
    return index;
  }
}
