import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  selectedContact: string | null = null;
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
      icon: 'mail',
      color: 'red',
      lastActive: '2 min ago',
      status: 'online',
    },
    {
      id: 'phone',
      name: 'Phone',
      value: '+91 90996 47469',
      icon: 'phone',
      color: 'green',
      lastActive: '5 min ago',
      status: 'online',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'linkedin.com/in/kirtivanjode/',
      icon: 'linkedin',
      color: 'blue',
      lastActive: '1 hour ago',
      status: 'away',
    },
    {
      id: 'github',
      name: 'GitHub',
      value: 'github.com/Kirtivanjode',
      icon: 'github',
      color: 'black',
      lastActive: '30 min ago',
      status: 'online',
    },
    {
      id: 'website',
      name: 'Website',
      value: 'alexjohnson.dev',
      icon: 'globe',
      color: 'purple',
      lastActive: 'Always available',
      status: 'online',
    },
    {
      id: 'location',
      name: 'Location',
      value: 'Vadodara, Gujrat',
      icon: 'map',
      color: 'orange',
      lastActive: 'Current',
      status: 'available',
    },
  ];

  selectContact(id: string) {
    this.selectedContact = id;
  }

  getContact() {
    return this.contacts.find((c) => c.id === this.selectedContact);
  }

  handleSubmit() {
    const { name, email, subject, message } = this.formData;

    if (!name || !email || !subject || !message) return;

    const mailtoLink = `mailto:kirtivanjode23@email.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Hi, I am ${name} (${email})%0D%0A%0D%0A${message}`
    )}`;

    window.location.href = mailtoLink;

    this.messageSent = true;
    setTimeout(() => {
      this.messageSent = false;
      this.formData = { name: '', email: '', subject: '', message: '' };
    }, 3000);
  }
}
