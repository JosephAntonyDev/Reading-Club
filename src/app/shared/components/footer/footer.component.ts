import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner container">
        <div class="footer-brand">
          <a routerLink="/" class="footer-logo" id="footer-logo">
            <span class="logo-icon"><svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg></span>
            <span class="logo-text">Reading Club</span>
          </a>
          <p class="footer-tagline">{{ i18n.t('footer.tagline') }}</p>
          <div class="footer-socials">
            <a href="#" class="social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <h4>{{ i18n.t('footer.explore') }}</h4>
            <a routerLink="/explorar">{{ i18n.t('nav.explore') }}</a>
            <a routerLink="/clubs">{{ i18n.t('nav.clubs') }}</a>
            <a routerLink="/mi-biblioteca">{{ i18n.t('nav.myLibrary') }}</a>
          </div>
          <div class="footer-col">
            <h4>{{ i18n.t('footer.community') }}</h4>
            <a href="#">{{ i18n.t('footer.about') }}</a>
            <a href="#">{{ i18n.t('footer.contact') }}</a>
            <a href="#">Blog</a>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <a href="#">{{ i18n.t('footer.privacy') }}</a>
            <a href="#">{{ i18n.t('footer.terms') }}</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom container">
        <p>&copy; 2024 Reading Club. {{ i18n.t('footer.rights') }}</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-primary);
      color: var(--text-inverse);
      padding: var(--space-16) 0 var(--space-8);
      margin-top: var(--space-24);
    }

    .footer-inner {
      display: grid;
      grid-template-columns: 1.5fr 2fr;
      gap: var(--space-16);
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }

    .footer-logo .logo-icon {
      font-size: 1.6rem;
      display: flex;
      align-items: center;
    }

    .logo-svg {
      color: var(--color-secondary);
      flex-shrink: 0;
    }

    .footer-logo .logo-text {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--text-inverse);
    }

    .footer-tagline {
      color: rgba(247, 244, 239, 0.6);
      font-size: var(--text-sm);
      line-height: 1.6;
      margin-bottom: var(--space-6);
      max-width: 280px;
    }

    .footer-socials {
      display: flex;
      gap: var(--space-3);
    }

    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(247, 244, 239, 0.15);
      color: rgba(247, 244, 239, 0.6);
      transition: all var(--transition-fast);
    }

    .social-link:hover {
      background: var(--color-secondary);
      border-color: var(--color-secondary);
      color: var(--color-primary);
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-8);
    }

    .footer-col h4 {
      font-family: var(--font-body);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-inverse);
      margin-bottom: var(--space-4);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .footer-col a {
      display: block;
      color: rgba(247, 244, 239, 0.5);
      font-size: var(--text-sm);
      padding: var(--space-1) 0;
      transition: color var(--transition-fast);
    }

    .footer-col a:hover {
      color: var(--color-secondary);
    }

    .footer-bottom {
      margin-top: var(--space-12);
      padding-top: var(--space-8);
      border-top: 1px solid rgba(247, 244, 239, 0.1);
    }

    .footer-bottom p {
      font-size: var(--text-xs);
      color: rgba(247, 244, 239, 0.4);
    }

    @media (max-width: 768px) {
      .footer-inner {
        grid-template-columns: 1fr;
        gap: var(--space-10);
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .footer-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  i18n = inject(I18nService);
}
