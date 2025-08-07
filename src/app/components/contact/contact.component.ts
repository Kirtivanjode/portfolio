import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

interface ContactOption {
  id: string;
  name: string;
  value: string;
  icon: string;
  color: string;
  lastActive: string;
  status: 'online' | 'away' | 'available';
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  messageSent = false;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  contacts: ContactOption[] = [
    {
      id: 'email',
      name: 'Email',
      value: 'kirtivanjode23@email.com',
      icon: '📧',
      color: 'red',
      lastActive: '2 min ago',
      status: 'online',
    },
    {
      id: 'phone',
      name: 'Phone',
      value: '+91 90996 47469',
      icon: '📱',
      color: 'green',
      lastActive: '5 min ago',
      status: 'online',
    },
    {
      id: 'website',
      name: 'Website',
      value: 'kirtifolio.vercel.app',
      icon: '🌐',
      color: 'purple',
      lastActive: 'Always available',
      status: 'online',
    },
    {
      id: 'github',
      name: 'GitHub',
      value: 'https://github.com/Kirtivanjode',
      icon: '🐱',
      color: 'black',
      lastActive: 'Active now',
      status: 'online',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'https://www.linkedin.com/in/kirti-vanjode/',
      icon: '🔗',
      color: '#0e76a8',
      lastActive: 'Active now',
      status: 'online',
    },
    {
      id: 'location',
      name: 'Location',
      value: 'Vadodara, Gujarat',
      icon: '📍',
      color: 'orange',
      lastActive: 'Current',
      status: 'available',
    },
  ];

  get filteredContacts(): ContactOption[] {
    return this.contacts.filter((c) => c.id !== 'location');
  }

  get location(): ContactOption | undefined {
    return this.contacts.find((c) => c.id === 'location');
  }

  sanitizePhoneNumber(phone: string): string {
    return phone.replace(/\s+/g, '');
  }

  handleSubmit(): void {
    if (
      !this.formData.name ||
      !this.formData.email ||
      !this.formData.subject ||
      !this.formData.message
    )
      return;

    const templateParams = {
      from_name: this.formData.name,
      email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message,
    };

    emailjs
      .send(
        'service_136pfrk',
        'template_q3peqvm',
        templateParams,
        'F6q_3TeAMBOo7kLC8'
      )
      .then(() => {
        this.messageSent = true;
        this.formData = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => (this.messageSent = false), 3000);
      })
      .catch((error) => {
        console.error('Email send failed:', error);
      });
  }
}
