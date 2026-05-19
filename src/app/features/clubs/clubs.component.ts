import { Component, inject, OnInit, signal } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { ClubCardComponent } from '../../shared/components/club-card/club-card.component';
import { Club } from '../../core/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [ClubCardComponent, FormsModule],
  template: `
    <section class="clubs-page">
      <div class="container">
        <div class="clubs-header">
          <h1 class="section-title" id="clubs-title">{{ i18n.t('clubs.title') }}</h1>
          <p class="section-subtitle">{{ i18n.t('clubs.subtitle') }}</p>
        </div>
        <div class="clubs-controls">
          <div class="search-wrapper" id="clubs-search">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" class="search-input" [placeholder]="i18n.t('clubs.search')" [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)" />
          </div>
        </div>
        <div class="clubs-grid">
          @for (club of filteredClubs(); track club.id; let i = $index) {
            <div class="animate-fade-in-up" [style.animation-delay.ms]="i * 100">
              <app-club-card [club]="club" />
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .clubs-page { padding-top: calc(var(--header-height) + var(--space-10)); min-height: 100vh; }
    .clubs-header { margin-bottom: var(--space-8); }
    .clubs-controls { margin-bottom: var(--space-10); }
    .search-wrapper { position: relative; max-width: 500px; }
    .search-icon { position: absolute; left: var(--space-4); top: 50%; transform: translateY(-50%); color: var(--text-tertiary); }
    .search-input { width: 100%; padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12); border: 1.5px solid var(--surface-secondary); border-radius: var(--radius-xl); background: var(--surface-card); font-size: var(--text-base); color: var(--text-primary); outline: none; transition: all var(--transition-fast); }
    .search-input:focus { border-color: var(--color-secondary); box-shadow: 0 0 0 3px rgba(201,169,110,0.15); }
    .clubs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
    @media (max-width: 1024px) { .clubs-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .clubs-grid { grid-template-columns: 1fr; } }
  `]
})
export class ClubsComponent implements OnInit {
  i18n = inject(I18nService);
  private data = inject(MockDataService);
  allClubs: Club[] = [];
  searchQuery = signal('');
  filteredClubs = () => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.allClubs;
    return this.allClubs.filter(c => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  };
  ngOnInit(): void { this.allClubs = this.data.getClubs(); }
}
