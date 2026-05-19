import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { Book } from '../../core/models';

@Component({
  selector: 'app-my-library',
  standalone: true,
  imports: [RouterLink, BookCardComponent],
  template: `
    <section class="library-page">
      <div class="container">
        <div class="library-header">
          <h1 class="section-title" id="library-title">{{ i18n.t('library.title') }}</h1>
          <p class="section-subtitle">{{ i18n.t('library.subtitle') }}</p>
        </div>

        <!-- Stats -->
        <div class="library-stats">
          <div class="stat-card card">
            <span class="stat-val">{{ completedCount }}</span>
            <span class="stat-lbl">{{ i18n.t('library.booksRead') }}</span>
          </div>
          <div class="stat-card card">
            <span class="stat-val">{{ totalPages }}</span>
            <span class="stat-lbl">{{ i18n.t('library.pagesRead') }}</span>
          </div>
          <div class="stat-card card">
            <span class="stat-val">{{ avgRating }}</span>
            <span class="stat-lbl">{{ i18n.t('library.avgRating') }}</span>
          </div>
        </div>

        <!-- Filters -->
        <div class="library-filters">
          <button class="filter-chip" [class.active]="filter() === 'all'" (click)="filter.set('all')">{{ i18n.t('library.all') }} ({{ allBooks.length }})</button>
          <button class="filter-chip" [class.active]="filter() === 'reading'" (click)="filter.set('reading')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> {{ i18n.t('library.reading') }} ({{ readingCount }})</button>
          <button class="filter-chip" [class.active]="filter() === 'completed'" (click)="filter.set('completed')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg> {{ i18n.t('library.completed') }} ({{ completedCount }})</button>
          <button class="filter-chip" [class.active]="filter() === 'want-to-read'" (click)="filter.set('want-to-read')"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg> {{ i18n.t('library.wantToRead') }} ({{ wantCount }})</button>
        </div>

        @if (filteredBooks().length > 0) {
          <div class="books-grid">
            @for (book of filteredBooks(); track book.id; let i = $index) {
              <div class="animate-fade-in-up" [style.animation-delay.ms]="i * 60">
                <app-book-card [book]="book" />
              </div>
            }
          </div>
        } @else {
          <div class="empty-state">
            <span class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg></span>
            <h3>{{ i18n.t('library.empty') }}</h3>
            <p>{{ i18n.t('library.emptyDesc') }}</p>
            <a routerLink="/explorar" class="btn btn-primary">{{ i18n.t('home.hero.cta') }}</a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .library-page { padding-top: calc(var(--header-height) + var(--space-10)); min-height: 100vh; }
    .library-header { margin-bottom: var(--space-8); }
    .library-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-10); }
    .stat-card { padding: var(--space-6); text-align: center; }
    .stat-val { display: block; font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-1); }
    .stat-lbl { font-size: var(--text-sm); color: var(--text-secondary); }
    .library-filters { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-8); }
    .filter-chip { display: inline-flex; align-items: center; gap: 6px; padding: var(--space-2) var(--space-4); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); background: var(--surface-card); border: 1.5px solid var(--surface-secondary); cursor: pointer; transition: all var(--transition-fast); }
    .filter-chip:hover { border-color: var(--color-secondary); color: var(--color-secondary-dark); }
    .filter-chip.active { background: var(--color-primary); color: white; border-color: var(--color-primary); }
    .books-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--space-6); }
    .empty-state { text-align: center; padding: var(--space-20) 0; }
    .empty-icon { display: flex; justify-content: center; margin-bottom: var(--space-4); color: var(--text-tertiary); }
    .empty-state h3 { margin-bottom: var(--space-2); }
    .empty-state p { color: var(--text-tertiary); margin-bottom: var(--space-6); }
    @media (max-width: 1024px) { .books-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 768px) { .books-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .library-stats { grid-template-columns: 1fr; } }
  `]
})
export class MyLibraryComponent implements OnInit {
  i18n = inject(I18nService);
  private data = inject(MockDataService);
  allBooks: Book[] = [];
  filter = signal<string>('all');
  completedCount = 0; readingCount = 0; wantCount = 0; totalPages = 0; avgRating = '0';

  filteredBooks = () => {
    const f = this.filter();
    if (f === 'all') return this.allBooks;
    return this.allBooks.filter(b => b.state === f);
  };

  ngOnInit(): void {
    this.allBooks = this.data.getUserLibrary();
    this.completedCount = this.allBooks.filter(b => b.state === 'completed').length;
    this.readingCount = this.allBooks.filter(b => b.state === 'reading').length;
    this.wantCount = this.allBooks.filter(b => b.state === 'want-to-read').length;
    const completed = this.allBooks.filter(b => b.state === 'completed');
    this.totalPages = completed.reduce((sum, b) => sum + b.pages, 0);
    this.avgRating = completed.length > 0 ? (completed.reduce((sum, b) => sum + b.rating, 0) / completed.length).toFixed(1) : '0';
  }
}
