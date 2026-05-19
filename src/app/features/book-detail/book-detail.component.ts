import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { Book, Club } from '../../core/models';
import { ClubCardComponent } from '../../shared/components/club-card/club-card.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink, ClubCardComponent],
  template: `
    @if (book) {
      <section class="book-detail-page">
        <!-- Book Header -->
        <div class="book-hero">
          <div class="book-hero-bg" [style.background-image]="'url(' + book.cover + ')'"></div>
          <div class="book-hero-overlay"></div>
          <div class="container book-hero-content">
            <a routerLink="/explorar" class="back-link" id="back-to-explore">← {{ i18n.t('general.back') }}</a>
            <div class="book-hero-grid">
              <div class="book-cover-large">
                <img [src]="book.cover" [alt]="book.title" />
              </div>
              <div class="book-hero-info">
                <span class="badge badge-gold">{{ i18n.t(book.genre) }}</span>
                <h1 class="book-detail-title" id="book-title">{{ i18n.t(book.title) }}</h1>
                <p class="book-detail-author">{{ i18n.t('book.by') }} <strong>{{ book.author }}</strong></p>

                <div class="book-meta-grid">
                  <div class="meta-item">
                    <span class="meta-label">{{ i18n.t('book.year') }}</span>
                    <span class="meta-value">{{ book.year }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">{{ i18n.t('book.pages') }}</span>
                    <span class="meta-value">{{ book.pages }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">{{ i18n.t('book.language') }}</span>
                    <span class="meta-value">{{ book.language }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">{{ i18n.t('book.rating') }}</span>
                    <span class="meta-value"><svg style="display:inline;vertical-align:middle;color:#fbbf24;margin-right:4px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>{{ book.rating }}/5</span>
                  </div>
                </div>

                @if (book.state === 'reading' && book.progress) {
                  <div class="progress-section">
                    <div class="progress-header">
                      <span>{{ i18n.t('book.progress') }}</span>
                      <span class="progress-pct">{{ book.progress }}%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-bar-fill" [style.width.%]="book.progress"></div>
                    </div>
                  </div>
                }

                <div class="book-actions">
                  <button class="btn btn-primary btn-lg" id="add-to-library" (click)="inLibrary.set(!inLibrary())">
                    {{ inLibrary() ? i18n.t('book.removeFromLibrary') : i18n.t('book.addToLibrary') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="container book-body">
          <div class="book-description card">
            <h2>{{ i18n.t('book.description') }}</h2>
            <p>{{ i18n.t(book.description) }}</p>
          </div>

          @if (relatedClubs.length > 0) {
            <div class="related-clubs">
              <h2>{{ i18n.t('book.relatedClubs') }}</h2>
              <div class="related-clubs-grid">
                @for (club of relatedClubs; track club.id) {
                  <app-club-card [club]="club" />
                }
              </div>
            </div>
          }
        </div>
      </section>
    }
  `,
  styles: [`
    .book-detail-page {
      min-height: 100vh;
    }

    .book-hero {
      position: relative;
      padding: calc(var(--header-height) + var(--space-10)) 0 var(--space-16);
      overflow: hidden;
    }

    .book-hero-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: blur(30px) brightness(0.3);
      transform: scale(1.2);
    }

    .book-hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(27, 31, 59, 0.8), rgba(27, 31, 59, 0.95));
    }

    .book-hero-content {
      position: relative;
      z-index: 1;
    }

    .back-link {
      display: inline-block;
      color: rgba(247, 244, 239, 0.6);
      font-size: var(--text-sm);
      margin-bottom: var(--space-8);
      transition: color var(--transition-fast);
    }

    .back-link:hover {
      color: var(--color-secondary);
    }

    .book-hero-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--space-12);
      align-items: start;
    }

    .book-cover-large {
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .book-cover-large img {
      width: 100%;
      aspect-ratio: 2 / 3;
      object-fit: cover;
    }

    .book-detail-title {
      font-size: var(--text-4xl);
      color: var(--text-inverse);
      margin-top: var(--space-4);
      margin-bottom: var(--space-2);
    }

    .book-detail-author {
      font-size: var(--text-lg);
      color: rgba(247, 244, 239, 0.6);
      margin-bottom: var(--space-8);
    }

    .book-detail-author strong {
      color: var(--color-secondary);
    }

    .book-meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }

    .meta-item {
      background: rgba(255,255,255,0.06);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      text-align: center;
    }

    .meta-label {
      display: block;
      font-size: var(--text-xs);
      color: rgba(247, 244, 239, 0.4);
      margin-bottom: var(--space-1);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .meta-value {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--text-inverse);
    }

    .progress-section {
      margin-bottom: var(--space-8);
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-2);
      font-size: var(--text-sm);
      color: rgba(247, 244, 239, 0.6);
    }

    .progress-pct {
      color: var(--color-secondary);
      font-weight: 600;
    }

    .book-actions {
      display: flex;
      gap: var(--space-4);
    }

    .book-body {
      padding-top: var(--space-12);
      padding-bottom: var(--space-12);
    }

    .book-description {
      padding: var(--space-8);
      margin-bottom: var(--space-12);
    }

    .book-description h2 {
      font-size: var(--text-2xl);
      margin-bottom: var(--space-4);
    }

    .book-description p {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.8;
    }

    .related-clubs h2 {
      font-size: var(--text-2xl);
      margin-bottom: var(--space-6);
    }

    .related-clubs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
    }

    @media (max-width: 768px) {
      .book-hero-grid {
        grid-template-columns: 180px 1fr;
        gap: var(--space-6);
      }

      .book-meta-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .related-clubs-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .book-hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .book-cover-large {
        max-width: 200px;
        margin: 0 auto;
      }

      .book-meta-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .book-actions {
        justify-content: center;
      }
    }
  `]
})
export class BookDetailComponent implements OnInit {
  i18n = inject(I18nService);
  private data = inject(MockDataService);
  private route = inject(ActivatedRoute);

  book: Book | undefined;
  relatedClubs: Club[] = [];
  inLibrary = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.data.getBookById(id);
    if (this.book) {
      this.inLibrary.set(!!this.book.state);
      this.relatedClubs = this.data.getClubs().filter(c => c.bookId === this.book!.id);
    }
  }
}
