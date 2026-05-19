import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { Book } from '../../core/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [BookCardComponent, FormsModule],
  template: `
    <section class="explore-page">
      <div class="container">
        <div class="explore-header">
          <h1 class="section-title" id="explore-title">{{ i18n.t('explore.title') }}</h1>
          <p class="section-subtitle">{{ i18n.t('explore.subtitle') }}</p>
        </div>

        <div class="explore-controls">
          <div class="search-wrapper" id="explore-search">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              class="search-input"
              [placeholder]="i18n.t('explore.search')"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
            />
          </div>

          <div class="filter-chips" id="genre-filters">
            <button
              class="filter-chip"
              [class.active]="selectedGenre() === ''"
              (click)="selectedGenre.set('')"
            >{{ i18n.t('explore.filter.all') }}</button>
            @for (genre of genres; track genre) {
              <button
                class="filter-chip"
                [class.active]="selectedGenre() === genre"
                (click)="selectedGenre.set(genre)"
              >{{ i18n.t(genre) }}</button>
            }
          </div>
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
            <p>{{ i18n.t('explore.noResults') }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .explore-page {
      padding-top: calc(var(--header-height) + var(--space-10));
      min-height: 100vh;
    }

    .explore-header {
      margin-bottom: var(--space-8);
    }

    .explore-controls {
      margin-bottom: var(--space-10);
    }

    .search-wrapper {
      position: relative;
      margin-bottom: var(--space-6);
    }

    .search-icon {
      position: absolute;
      left: var(--space-4);
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
    }

    .search-input {
      width: 100%;
      padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
      border: 1.5px solid var(--surface-secondary);
      border-radius: var(--radius-xl);
      background: var(--surface-card);
      font-size: var(--text-base);
      color: var(--text-primary);
      outline: none;
      transition: all var(--transition-fast);
    }

    .search-input:focus {
      border-color: var(--color-secondary);
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.15);
    }

    .search-input::placeholder {
      color: var(--text-tertiary);
    }

    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .filter-chip {
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-secondary);
      background: var(--surface-card);
      border: 1.5px solid var(--surface-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .filter-chip:hover {
      border-color: var(--color-secondary);
      color: var(--color-secondary-dark);
    }

    .filter-chip.active {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: var(--space-6);
    }

    .empty-state {
      text-align: center;
      padding: var(--space-20) 0;
    }

    .empty-icon {
      display: flex;
      justify-content: center;
      margin-bottom: var(--space-4);
      color: var(--text-tertiary);
    }

    .empty-state p {
      color: var(--text-tertiary);
      font-size: var(--text-lg);
    }

    @media (max-width: 1024px) {
      .books-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }

    @media (max-width: 768px) {
      .books-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 480px) {
      .books-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-4); }
    }
  `]
})
export class ExploreComponent implements OnInit {
  i18n = inject(I18nService);
  private data = inject(MockDataService);

  allBooks: Book[] = [];
  genres: string[] = [];
  searchQuery = signal('');
  selectedGenre = signal('');

  filteredBooks = computed(() => {
    let books = this.allBooks;
    const query = this.searchQuery().toLowerCase();
    const genre = this.selectedGenre();

    if (query) {
      books = books.filter(b =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.genre.toLowerCase().includes(query)
      );
    }

    if (genre) {
      books = books.filter(b => b.genre === genre);
    }

    return books;
  });

  ngOnInit(): void {
    this.allBooks = this.data.getBooks();
    this.genres = this.data.getCategories();
  }
}
