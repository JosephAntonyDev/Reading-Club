import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../core/services/i18n.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <section class="auth-page">
      <div class="auth-left">
        <div class="auth-brand">
          <a routerLink="/" class="auth-logo">Reading Club</a>
          <h2>{{ i18n.t('auth.loginSubtitle') }}</h2>
          <p>Explora miles de libros y únete a comunidades de lectores apasionados.</p>
        </div>
      </div>
      <div class="auth-right">
        <div class="auth-form-wrapper">
          <h1 id="login-title">{{ i18n.t('auth.login') }}</h1>
          <form (ngSubmit)="onLogin()">
            <div class="form-group">
              <label class="form-label">{{ i18n.t('auth.email') }}</label>
              <input type="email" class="form-input" placeholder="tu@email.com" [(ngModel)]="email" name="email" id="login-email" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ i18n.t('auth.password') }}</label>
              <input type="password" class="form-input" placeholder="••••••••" [(ngModel)]="password" name="password" id="login-password" />
            </div>
            <a href="#" class="forgot-link">{{ i18n.t('auth.forgotPassword') }}</a>
            <button type="submit" class="btn btn-primary btn-lg auth-submit" id="login-submit">{{ i18n.t('auth.loginBtn') }}</button>
          </form>
          <p class="auth-switch">{{ i18n.t('auth.noAccount') }} <a routerLink="/registro">{{ i18n.t('auth.register') }}</a></p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
    .auth-left { background: linear-gradient(135deg, var(--color-primary) 0%, #2A2F52 50%, #3D3262 100%); display: flex; align-items: center; justify-content: center; padding: var(--space-12); position: relative; overflow: hidden; }
    .auth-left::after { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(201,169,110,0.08) 1px, transparent 1px); background-size: 30px 30px; }
    .auth-brand { position: relative; z-index: 1; color: var(--text-inverse); max-width: 400px; }
    .auth-logo { font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 700; color: var(--text-inverse); display: block; margin-bottom: var(--space-8); }
    .auth-brand h2 { font-size: var(--text-4xl); margin-bottom: var(--space-4); line-height: 1.2; font-weight: 800; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
    .auth-brand p { color: rgba(255,255,255,0.95); font-size: var(--text-lg); line-height: 1.6; text-shadow: 0 1px 3px rgba(0,0,0,0.5); font-weight: 500; }
    .auth-right { display: flex; align-items: center; justify-content: center; padding: var(--space-12); background: var(--surface-primary); }
    .auth-form-wrapper { width: 100%; max-width: 400px; }
    .auth-form-wrapper h1 { font-size: var(--text-3xl); margin-bottom: var(--space-8); }
    .forgot-link { display: block; text-align: right; font-size: var(--text-sm); color: var(--color-secondary); margin-bottom: var(--space-6); }
    .forgot-link:hover { color: var(--color-secondary-dark); }
    .auth-submit { width: 100%; margin-bottom: var(--space-6); }
    .auth-switch { text-align: center; font-size: var(--text-sm); color: var(--text-secondary); }
    .auth-switch a { color: var(--color-accent); font-weight: 600; }
    .auth-switch a:hover { text-decoration: underline; }
    @media (max-width: 768px) { .auth-page { grid-template-columns: 1fr; } .auth-left { display: none; } }
  `]
})
export class LoginComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  email = ''; password = '';
  onLogin(): void { 
    console.log('Mock login:', this.email); 
    this.router.navigate(['/']);
  }
}
