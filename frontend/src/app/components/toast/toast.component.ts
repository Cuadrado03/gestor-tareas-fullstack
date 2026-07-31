import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(public notificationService: NotificationService) {}

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }
}