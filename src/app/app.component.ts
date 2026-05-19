import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    @if (showLayout) {
      <app-header />
    }
    <main>
      <router-outlet />
    </main>
    @if (showLayout) {
      <app-footer />
    }
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !(
          event.url === '/login' || event.url === '/registro'
        );
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 });
        }
      }
    });
  }
}
