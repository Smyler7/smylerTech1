import {ChangeDetectionStrategy, Component, signal, AfterViewInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {animate, stagger, inView} from 'motion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  currentYear = new Date().getFullYear();
  isMenuOpen = signal(false);
  isModalOpen = signal(false);
  isSubmitted = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  openModal() {
    this.isModalOpen.set(true);
    this.isSubmitted.set(false);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.isSubmitted.set(true);
    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  ngAfterViewInit() {
    // Hero animations
    animate(".hero-stagger", { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1), duration: 0.8, ease: "easeOut" });
    animate(".hero-code", { opacity: [0, 1], x: [20, 0], rotate: [2, 2] }, { duration: 0.8, ease: "easeOut", delay: 0.4 });

    // Feature cards scroll animation
    document.querySelectorAll('.feature-card').forEach((card, index) => {
      inView(card, () => {
        animate(card, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, ease: "easeOut", delay: index * 0.1 });
      });
    });

    // Pricing cards scroll animation
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
      inView(card, () => {
        animate(card, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, ease: "easeOut", delay: index * 0.1 });
      });
    });
  }
}
