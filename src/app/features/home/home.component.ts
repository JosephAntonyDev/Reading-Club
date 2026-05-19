import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { ClubCardComponent } from '../../shared/components/club-card/club-card.component';
import { Book, Club } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BookCardComponent, ClubCardComponent],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content container">
        <div class="hero-text">
          <h1 class="hero-title animate-fade-in-up" id="hero-title">{{ i18n.t('home.hero.title') }}</h1>
          <p class="hero-subtitle animate-fade-in-up stagger-2" id="hero-subtitle">{{ i18n.t('home.hero.subtitle') }}</p>
          <div class="hero-cta animate-fade-in-up stagger-3">
            <a routerLink="/explorar" class="btn btn-primary btn-lg" id="hero-cta">{{ i18n.t('home.hero.cta') }}</a>
            <a routerLink="/clubs" class="btn btn-outline btn-lg" id="hero-secondary">{{ i18n.t('home.hero.secondary') }}</a>
          </div>
        </div>
        <div class="hero-visual animate-fade-in-up stagger-4">
          <div class="hero-books-stack">
            @for (book of featuredBooks.slice(0, 3); track book.id; let i = $index) {
              <div class="hero-book" [style.--i]="i">
                <img [src]="book.cover" [alt]="book.title" />
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item animate-fade-in-up">
            <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg></div>
            <span class="stat-number">2,500+</span>
            <span class="stat-label">{{ i18n.t('home.stats.books') }}</span>
          </div>
          <div class="stat-item animate-fade-in-up stagger-1">
            <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <span class="stat-number">10K+</span>
            <span class="stat-label">{{ i18n.t('home.stats.members') }}</span>
          </div>
          <div class="stat-item animate-fade-in-up stagger-2">
            <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <span class="stat-number">350+</span>
            <span class="stat-label">{{ i18n.t('home.stats.clubs') }}</span>
          </div>
          <div class="stat-item animate-fade-in-up stagger-3">
            <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
            <span class="stat-number">8K+</span>
            <span class="stat-label">{{ i18n.t('home.stats.reviews') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Books -->
    <section class="section" id="featured-books">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">{{ i18n.t('home.featured') }}</h2>
            <p class="section-subtitle">{{ i18n.t('home.featuredSub') }}</p>
          </div>
          <a routerLink="/explorar" class="btn btn-ghost" id="see-all-books">{{ i18n.t('general.seeAll') }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
        </div>
        <div class="books-grid">
          @for (book of featuredBooks; track book.id; let i = $index) {
            <div class="animate-fade-in-up" [style.animation-delay.ms]="i * 80">
              <app-book-card [book]="book" />
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section categories-section" id="categories">
      <div class="container">
        <h2 class="section-title">{{ i18n.t('home.categories') }}</h2>
        <p class="section-subtitle">{{ i18n.t('home.categoriesSub') }}</p>
        <div class="categories-grid">
          @for (cat of categories; track cat; let i = $index) {
            <a routerLink="/explorar" [queryParams]="{genre: cat}" class="category-chip animate-fade-in-up" [style.animation-delay.ms]="i * 60">
              <span class="category-icon" [innerHTML]="getCategoryIcon(cat)"></span>
              <span>{{ i18n.t(cat) }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Popular Clubs -->
    <section class="section" id="popular-clubs">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">{{ i18n.t('home.popular') }}</h2>
            <p class="section-subtitle">{{ i18n.t('home.popularSub') }}</p>
          </div>
          <a routerLink="/clubs" class="btn btn-ghost" id="see-all-clubs">{{ i18n.t('general.seeAll') }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>
        </div>
        <div class="clubs-grid">
          @for (club of popularClubs; track club.id; let i = $index) {
            <div class="animate-fade-in-up" [style.animation-delay.ms]="i * 100">
              <app-club-card [club]="club" />
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" id="cta">
      <div class="container">
        <div class="cta-card">
          <div class="cta-bg"></div>
          <div class="cta-content">
            <h2 class="cta-title">{{ i18n.t('home.cta.title') }}</h2>
            <p class="cta-subtitle">{{ i18n.t('home.cta.subtitle') }}</p>
            <a routerLink="/registro" class="btn btn-primary btn-lg" id="cta-button">{{ i18n.t('home.cta.button') }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero { position: relative; min-height: 92vh; display: flex; align-items: center; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; z-index: 0; }
    .hero-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, var(--color-primary) 0%, #2A2F52 40%, #3D3262 70%, var(--color-primary-dark) 100%); }
    .hero-pattern { position: absolute; inset: 0; background-image: radial-gradient(rgba(201,169,110,0.08) 1px, transparent 1px); background-size: 30px 30px; }
    .hero-content { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); align-items: center; padding-top: var(--header-height); padding-bottom: var(--space-16); }
    .hero-title { font-size: var(--text-6xl); color: var(--text-inverse); margin-bottom: var(--space-6); line-height: 1.1; max-width: 600px; }
    .hero-subtitle { font-size: var(--text-lg); color: rgba(247,244,239,0.7); line-height: 1.7; margin-bottom: var(--space-8); max-width: 500px; }
    .hero-cta { display: flex; gap: var(--space-4); flex-wrap: wrap; }
    .hero-cta .btn-outline { border-color: rgba(247,244,239,0.3); color: var(--text-inverse); }
    .hero-cta .btn-outline:hover { background: rgba(247,244,239,0.1); border-color: rgba(247,244,239,0.5); }
    .hero-visual { display: flex; justify-content: center; align-items: center; }
    .hero-books-stack { position: relative; width: 300px; height: 420px; perspective: 800px; }
    .hero-book { position: absolute; width: 220px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.4); transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1); animation: float 4s ease-in-out infinite; }
    .hero-book:nth-child(1) { top: 0; left: 40px; z-index: 3; transform: rotate(-5deg); animation-delay: 0s; }
    .hero-book:nth-child(2) { top: 30px; left: 0; z-index: 2; transform: rotate(3deg); animation-delay: 0.5s; }
    .hero-book:nth-child(3) { top: 60px; left: 80px; z-index: 1; transform: rotate(8deg); animation-delay: 1s; }
    .hero-book img { width: 100%; aspect-ratio: 2 / 3; object-fit: cover; }
    .hero-books-stack:hover .hero-book:nth-child(1) { transform: rotate(-5deg) translateY(-10px); }
    .hero-books-stack:hover .hero-book:nth-child(2) { transform: rotate(3deg) translateX(-15px); }
    .hero-books-stack:hover .hero-book:nth-child(3) { transform: rotate(8deg) translateX(15px); }

    .stats-section { margin-top: -50px; position: relative; z-index: 2; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); background: var(--surface-card); border-radius: var(--radius-2xl); padding: var(--space-10) var(--space-8); box-shadow: var(--shadow-xl); }
    .stat-item { text-align: center; }
    .stat-icon { display: flex; justify-content: center; margin-bottom: var(--space-3); color: var(--color-secondary); }
    .stat-number { display: block; font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-1); }
    .stat-label { font-size: var(--text-sm); color: var(--text-secondary); font-weight: 500; }

    .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: var(--space-10); }
    .books-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--space-6); }

    .categories-section { background: var(--surface-secondary); }
    .categories-grid { display: flex; flex-wrap: wrap; gap: var(--space-3); }
    .category-chip { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-5); background: var(--surface-card); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 500; color: var(--text-primary); box-shadow: var(--shadow-sm); transition: all var(--transition-base); text-decoration: none; }
    .category-chip:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); background: var(--color-primary); color: var(--text-inverse); }
    .category-chip:hover .category-icon { color: var(--color-secondary); }
    .category-icon { display: flex; align-items: center; color: var(--color-secondary); }

    .clubs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }

    .cta-card { position: relative; border-radius: var(--radius-2xl); overflow: hidden; padding: var(--space-20) var(--space-12); text-align: center; }
    .cta-bg { position: absolute; inset: 0; background: linear-gradient(135deg, var(--color-primary) 0%, #2A2F52 50%, #3D3262 100%); }
    .cta-bg::after { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(201,169,110,0.1) 1px, transparent 1px); background-size: 24px 24px; }
    .cta-content { position: relative; z-index: 1; }
    .cta-title { font-size: var(--text-4xl); color: var(--text-inverse); margin-bottom: var(--space-4); }
    .cta-subtitle { font-size: var(--text-lg); color: rgba(247,244,239,0.7); margin-bottom: var(--space-8); max-width: 500px; margin-left: auto; margin-right: auto; }

    @media (max-width: 1024px) {
      .hero-content { grid-template-columns: 1fr; text-align: center; }
      .hero-title, .hero-subtitle { max-width: 100%; }
      .hero-cta { justify-content: center; }
      .hero-visual { display: none; }
      .books-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .clubs-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .hero { min-height: auto; padding-bottom: var(--space-20); }
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-6); padding: var(--space-8) var(--space-6); }
      .books-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .clubs-grid { grid-template-columns: 1fr; }
      .section-header { flex-direction: column; align-items: flex-start; gap: var(--space-4); }
      .cta-card { padding: var(--space-12) var(--space-6); }
    }
    @media (max-width: 480px) {
      .books-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-4); }
    }
  `]
})
export class HomeComponent implements OnInit {
  i18n = inject(I18nService);
  private data = inject(MockDataService);
  featuredBooks: Book[] = [];
  popularClubs: Club[] = [];
  categories: string[] = [];

  ngOnInit(): void {
    this.featuredBooks = this.data.getBooks().slice(0, 5);
    this.popularClubs = this.data.getClubs().slice(0, 3);
    this.categories = this.data.getCategories();
  }

  getCategoryIcon(cat: string): string {
    const icons: Record<string, string> = {
      'Realismo Mágico': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
      'Clásico': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      'Distopía': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
      'Fábula': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 9 1.5 1.5L9 12"/><path d="m15 9-1.5 1.5L15 12"/></svg>',
      'Experimental': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/></svg>',
      'Misterio': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
      'Ciencia Ficción': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
      'Romance': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
      'Cuentos': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
      'Fantasía': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
      'Ficción': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>',
      'Novela Corta': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
      'Aventura': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    };
    return icons[cat] || '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>';
  }
}
