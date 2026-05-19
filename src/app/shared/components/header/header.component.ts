import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="header-inner container">
        <a routerLink="/" class="logo" id="header-logo">
          <span class="logo-icon"><svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg></span>
          <span class="logo-text">Reading Club</span>
        </a>

        <nav class="nav-desktop" id="nav-desktop">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" id="nav-home">{{ i18n.t('nav.home') }}</a>
          <a routerLink="/explorar" routerLinkActive="active" id="nav-explore">{{ i18n.t('nav.explore') }}</a>
          <a routerLink="/clubs" routerLinkActive="active" id="nav-clubs">{{ i18n.t('nav.clubs') }}</a>
          <a routerLink="/mi-biblioteca" routerLinkActive="active" id="nav-library">{{ i18n.t('nav.myLibrary') }}</a>
        </nav>

        <div class="header-actions">
          <a routerLink="/ajustes" class="btn-icon" id="nav-settings" title="{{ i18n.t('nav.settings') }}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </a>
          <a routerLink="/login" class="btn btn-outline btn-sm" id="nav-login-btn">{{ i18n.t('nav.login') }}</a>
        </div>

        <button class="menu-toggle" (click)="toggleMenu()" id="mobile-menu-toggle" [attr.aria-label]="'Menu'">
          <span class="menu-bar" [class.open]="menuOpen()"></span>
          <span class="menu-bar" [class.open]="menuOpen()"></span>
          <span class="menu-bar" [class.open]="menuOpen()"></span>
        </button>
      </div>

      <div class="nav-mobile" [class.open]="menuOpen()" id="nav-mobile">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">{{ i18n.t('nav.home') }}</a>
        <a routerLink="/explorar" routerLinkActive="active" (click)="closeMenu()">{{ i18n.t('nav.explore') }}</a>
        <a routerLink="/clubs" routerLinkActive="active" (click)="closeMenu()">{{ i18n.t('nav.clubs') }}</a>
        <a routerLink="/mi-biblioteca" routerLinkActive="active" (click)="closeMenu()">{{ i18n.t('nav.myLibrary') }}</a>
        <a routerLink="/ajustes" routerLinkActive="active" (click)="closeMenu()">{{ i18n.t('nav.settings') }}</a>
        <a routerLink="/login" class="btn btn-primary btn-sm" (click)="closeMenu()">{{ i18n.t('nav.login') }}</a>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-sticky);
      background: rgba(247, 244, 239, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid transparent;
      transition: all var(--transition-base);
    }

    .header.scrolled {
      background: rgba(247, 244, 239, 0.95);
      border-bottom-color: var(--surface-secondary);
      box-shadow: var(--shadow-sm);
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--header-height);
      gap: var(--space-6);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;
      flex-shrink: 0;
    }

    .logo-icon {
      font-size: 1.6rem;
      display: flex;
      align-items: center;
    }

    .logo-svg {
      color: var(--color-secondary);
      flex-shrink: 0;
    }

    .logo-text {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-primary);
      letter-spacing: -0.02em;
    }

    .nav-desktop {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    .nav-desktop a {
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-lg);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-secondary);
      transition: all var(--transition-fast);
    }

    .nav-desktop a:hover {
      color: var(--text-primary);
      background: rgba(27, 31, 59, 0.05);
    }

    .nav-desktop a.active {
      color: var(--color-primary);
      background: rgba(27, 31, 59, 0.08);
      font-weight: 600;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .btn-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-lg);
      color: var(--text-secondary);
      transition: all var(--transition-fast);
    }

    .btn-icon:hover {
      background: rgba(27, 31, 59, 0.05);
      color: var(--text-primary);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      padding: var(--space-2);
      z-index: calc(var(--z-sticky) + 1);
    }

    .menu-bar {
      width: 22px;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all var(--transition-base);
      transform-origin: center;
    }

    .menu-bar.open:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-bar.open:nth-child(2) {
      opacity: 0;
    }

    .menu-bar.open:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    .nav-mobile {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      padding: var(--space-4) var(--space-6) var(--space-8);
      background: var(--surface-primary);
      border-bottom: 1px solid var(--surface-secondary);
      transform: translateY(-20px);
      opacity: 0;
      visibility: hidden;
      transition: all var(--transition-base);
      box-shadow: var(--shadow-md);
    }

    .nav-mobile.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-mobile a {
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-lg);
      font-size: var(--text-base);
      font-weight: 500;
      color: var(--text-secondary);
      transition: all var(--transition-fast);
    }

    .nav-mobile a:hover,
    .nav-mobile a.active {
      color: var(--color-primary);
      background: rgba(27, 31, 59, 0.05);
    }

    @media (max-width: 768px) {
      .nav-desktop, .header-actions { display: none; }
      .menu-toggle { display: flex; }
      .nav-mobile { display: flex; }
    }
  `]
})
export class HeaderComponent {
  i18n = inject(I18nService);
  menuOpen = signal(false);
  isScrolled = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 20);
      });
    }
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
