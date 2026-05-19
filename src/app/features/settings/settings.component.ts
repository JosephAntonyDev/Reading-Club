import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { Language } from '../../core/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="settings-page">
      <div class="container">
        <a routerLink="/" class="back-link-dark">← {{ i18n.t('general.back') }}</a>
        <h1 class="section-title" id="settings-title">{{ i18n.t('settings.title') }}</h1>

        <div class="settings-grid">
          <!-- Language -->
          <div class="settings-card card">
            <h2><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> {{ i18n.t('settings.language') }}</h2>
            <p class="settings-desc">{{ i18n.t('settings.language') }}</p>
            <div class="lang-options">
              <button class="lang-btn" [class.active]="i18n.lang() === 'es'" (click)="setLang('es')" id="lang-es">
                <span class="lang-flag">ES</span>
                <span>{{ i18n.t('settings.spanish') }}</span>
              </button>
              <button class="lang-btn" [class.active]="i18n.lang() === 'en'" (click)="setLang('en')" id="lang-en">
                <span class="lang-flag">EN</span>
                <span>{{ i18n.t('settings.english') }}</span>
              </button>
            </div>
          </div>

          <!-- Profile -->
          <div class="settings-card card">
            <h2><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> {{ i18n.t('settings.profile') }}</h2>
            <div class="profile-preview">
              <img src="https://i.pravatar.cc/150?img=1" alt="Avatar" class="avatar avatar-lg" />
              <div>
                <h3>José Antony</h3>
                <p>jose&#64;readingclub.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .settings-page { padding-top: calc(var(--header-height) + var(--space-10)); min-height: 100vh; padding-bottom: var(--space-20); }
    .back-link-dark { display: inline-block; color: var(--text-tertiary); font-size: var(--text-sm); margin-bottom: var(--space-6); transition: color var(--transition-fast); }
    .back-link-dark:hover { color: var(--color-secondary); }
    .settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); margin-top: var(--space-8); }
    .settings-card { padding: var(--space-8); }
    .settings-card h2 { font-size: var(--text-xl); margin-bottom: var(--space-2); }
    .settings-desc { font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-6); }
    .lang-options { display: flex; gap: var(--space-3); }
    .lang-btn { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4) var(--space-6); border-radius: var(--radius-xl); border: 2px solid var(--surface-secondary); background: var(--surface-card); font-size: var(--text-sm); font-weight: 500; cursor: pointer; transition: all var(--transition-fast); flex: 1; }
    .lang-btn:hover { border-color: var(--color-secondary); }
    .lang-btn.active { border-color: var(--color-primary); background: rgba(27,31,59,0.05); }
    .lang-flag { font-size: 1.5rem; }
    .profile-preview { display: flex; align-items: center; gap: var(--space-4); margin-top: var(--space-4); }
    .profile-preview h3 { font-size: var(--text-lg); margin-bottom: var(--space-1); }
    .profile-preview p { font-size: var(--text-sm); color: var(--text-secondary); }
    @media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } }
  `]
})
export class SettingsComponent {
  i18n = inject(I18nService);
  setLang(lang: Language): void { this.i18n.setLanguage(lang); }
}
