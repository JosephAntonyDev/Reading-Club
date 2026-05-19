import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../core/models';
import { I18nService } from '../../../core/services/i18n.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/libro', book.id]" class="book-card" [id]="'book-card-' + book.id">
      <div class="book-cover-wrapper">
        <img [src]="book.cover" [alt]="book.title" class="book-cover" loading="lazy" />
        <div class="book-overlay">
          <span class="book-rating">
            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {{ book.rating }}
          </span>
        </div>
        @if (book.state === 'reading' && book.progress) {
          <div class="book-progress">
            <div class="book-progress-fill" [style.width.%]="book.progress"></div>
          </div>
        }
      </div>
      <div class="book-info">
        <h3 class="book-title">{{ i18n.t(book.title) }}</h3>
        <p class="book-author">{{ book.author }}</p>
        <span class="badge badge-gold">{{ i18n.t(book.genre) }}</span>
      </div>
    </a>
  `,
  styles: [`
    .book-card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--surface-card);
      box-shadow: var(--shadow-card);
      transition: all var(--transition-base);
      cursor: pointer;
      height: 100%;
    }

    .book-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
    }

    .book-card:hover .book-cover {
      transform: scale(1.05);
    }

    .book-card:hover .book-overlay {
      opacity: 1;
    }

    .book-cover-wrapper {
      position: relative;
      aspect-ratio: 2 / 3;
      overflow: hidden;
      background: var(--surface-secondary);
      flex-shrink: 0;
    }

    .book-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }

    .book-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%);
      display: flex;
      align-items: flex-end;
      padding: var(--space-3);
      opacity: 0;
      transition: opacity var(--transition-base);
    }

    .book-rating {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(8px);
      color: #fbbf24;
      font-size: var(--text-xs);
      font-weight: 600;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-md);
    }

    .star-icon {
      flex-shrink: 0;
    }

    .book-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(0,0,0,0.3);
    }

    .book-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-secondary), var(--color-accent));
      transition: width var(--transition-slow);
    }

    .book-info {
      padding: var(--space-4);
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 110px;
    }

    .book-title {
      font-family: var(--font-heading);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--space-1);
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 2.6em;
    }

    .book-author {
      font-size: var(--text-xs);
      color: var(--text-secondary);
      margin-bottom: auto;
      padding-bottom: var(--space-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .badge {
      align-self: flex-start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  `]
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  i18n = inject(I18nService);
}
