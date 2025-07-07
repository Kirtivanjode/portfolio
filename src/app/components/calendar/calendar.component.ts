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
  location?: string;
  attendees?: string[];
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

  events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(2025, 6, 15),
      time: '10:00 AM',
      type: 'meeting',
      description: 'Weekly team sync and project updates',
    },
    {
      id: '2',
      title: 'Client Presentation',
      date: new Date(2025, 6, 18),
      time: '2:00 PM',
      type: 'work',
      description: 'Present new website design to client',
    },
    {
      id: '3',
      title: 'Gym Workout',
      date: new Date(2025, 6, 20),
      time: '6:00 PM',
      type: 'personal',
      description: 'Leg day workout session',
    },
    {
      id: '4',
      title: 'Code Review',
      date: new Date(2025, 6, 22),
      time: '11:00 AM',
      type: 'work',
      description: 'Review pull requests',
    },
  ];

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
    if (direction === 'prev') {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
    this.generateDays();
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  }

  getEventColor(type: string): string {
    switch (type) {
      case 'meeting':
        return '#007bff'; // blue
      case 'work':
        return '#28a745'; // green
      case 'personal':
        return '#c084fc'; // purple
      case 'reminder':
        return '#ff9800'; // orange
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
        return '🌸';
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

  selectDate(date: Date) {
    console.log('Selected date:', date);
    this.selectedDate = date;
  }

  closeSidebar(): void {
    this.selectedDate = null;
  }
}
