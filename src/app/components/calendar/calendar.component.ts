import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'personal' | 'work' | 'reminder';
  description?: string;
  repeatYearly?: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  selectedDate: Date | null = null;
  editingEventId: string | null = null;

  events: CalendarEvent[] = [];

  newEvent = {
    title: '',
    time: '',
    type: 'meeting',
    description: '',
  };

  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  days: (Date | null)[] = [];

  ngOnInit(): void {
    this.events = [
      {
        id: '1',
        title: '🎓 Diploma in IT Completed',
        date: new Date(2024, 5, 1),
        time: 'All Day',
        type: 'work',
        description: 'Completed Diploma in IT from Vadodara',
      },
      {
        id: '2',
        title: '🛠️ Internship at Hi-Mak',
        date: new Date(2024, 2, 1),
        time: 'All Day',
        type: 'work',
        description: 'Internship: IT support & documentation',
      },
      {
        id: '3',
        title: '💻 Portfolio Launched',
        date: new Date(2025, 0, 15),
        time: 'All Day',
        type: 'personal',
        description: 'Launched kirtifolio.vercel.app',
      },
      {
        id: '4',
        title: '🚀 Career Goal',
        date: new Date(2025, 7, 1),
        time: 'All Day',
        type: 'reminder',
        description: 'Seeking entry-level IT role in reputed company',
      },
      {
        id: 'birthday-1',
        title: '🎂 Birthday – Kirti',
        date: new Date(new Date().getFullYear(), 7, 23),
        time: 'All Day',
        type: 'personal',
        description: 'Happy Birthday!',
        repeatYearly: true,
      },
    ];

    this.saveToStorage();
    this.generateDays();
  }

  generateDays(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysArray: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }

    this.days = daysArray;
  }

  navigateMonth(direction: 'prev' | 'next'): void {
    this.currentDate.setMonth(
      this.currentDate.getMonth() + (direction === 'next' ? 1 : -1)
    );
    this.generateDays();
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter((event) => {
      if (event.repeatYearly) {
        return (
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth()
        );
      }
      return event.date.toDateString() === date.toDateString();
    });
  }

  getEventColor(type: string): string {
    switch (type) {
      case 'meeting':
        return '#007bff';
      case 'work':
        return '#28a745';
      case 'personal':
        return '#ff66b2';
      case 'reminder':
        return '#ff9800';
      default:
        return '#ccc';
    }
  }

  getEventEmoji(type: string): string {
    switch (type) {
      case 'meeting':
        return '📅';
      case 'work':
        return '💼';
      case 'personal':
        return '🎂';
      case 'reminder':
        return '⏰';
      default:
        return '📌';
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  closeSidebar(): void {
    this.selectedDate = null;
    this.editingEventId = null;
    this.newEvent = { title: '', time: '', type: 'meeting', description: '' };
  }

  addEvent(): void {
    if (!this.selectedDate) return;

    const newId = Math.random().toString(36).substr(2, 9);

    this.events.push({
      id: newId,
      title: this.newEvent.title,
      date: new Date(this.selectedDate),
      time: this.newEvent.time,
      type: this.newEvent.type as any,
      description: this.newEvent.description,
    });

    this.saveToStorage();

    this.newEvent = { title: '', time: '', type: 'meeting', description: '' };
    this.closeSidebar();
  }

  saveToStorage(): void {
    localStorage.setItem('calendar-events', JSON.stringify(this.events));
  }
}
