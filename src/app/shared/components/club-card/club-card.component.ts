import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Club } from '../../../core/models';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-club-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/club', club.id]" class="club-card" [id]="'club-card-' + club.id">
      <div class="club-cover-wrapper">
        <img [src]="club.coverImage" [alt]="club.name" class="club-cover" loading="lazy" />
        <div class="club-cover-overlay"></div>
        <div class="club-cover-content">
          <span class="badge badge-gold">{{ i18n.t(club.category) }}</span>
        </div>
      </div>
      <div class="club-body">
        <h3 class="club-name">{{ i18n.t(club.name) }}</h3>
        <p class="club-desc">{{ i18n.t(club.description) }}</p>
        <div class="club-meta">
          <div class="club-avatars">
            @for (member of club.members.slice(0, 4); track member.id) {
              <img [src]="member.avatar" [alt]="member.name" class="avatar avatar-sm" />
            }
            @if (club.members.length > 4) {
              <span class="avatar-count">+{{ club.members.length - 4 }}</span>
            }
          </div>
          <span class="club-member-count">{{ club.members.length }}/{{ club.maxMembers }} {{ i18n.t('clubs.members') }}</span>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .club-card {
      display: flex;
      flex-direction: column;
      background: var(--surface-card);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      transition: all var(--transition-base);
      cursor: pointer;
      text-decoration: none;
      height: 100%;
    }
    .club-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); }
    .club-card:hover .club-cover { transform: scale(1.05); }
    .club-cover-wrapper { position: relative; height: 160px; overflow: hidden; flex-shrink: 0; }
    .club-cover { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow); }
    .club-cover-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(27,31,59,0.7), rgba(27,31,59,0.1)); }
    .club-cover-content { position: absolute; bottom: var(--space-3); left: var(--space-4); }
    .club-body { padding: var(--space-5); display: flex; flex-direction: column; flex: 1; min-height: 160px; }
    .club-name {
      font-family: var(--font-heading); font-size: var(--text-lg); font-weight: 700;
      color: var(--text-primary); margin-bottom: var(--space-2);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .club-desc {
      font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;
      margin-bottom: var(--space-4);
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
      flex: 1;
    }
    .club-meta { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-top: auto; }
    .club-avatars { display: flex; align-items: center; }
    .club-avatars .avatar { margin-left: -8px; border: 2px solid var(--surface-card); }
    .club-avatars .avatar:first-child { margin-left: 0; }
    .avatar-count { width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: white; font-size: var(--text-xs); font-weight: 600; display: flex; align-items: center; justify-content: center; margin-left: -8px; border: 2px solid var(--surface-card); }
    .club-member-count { font-size: var(--text-xs); color: var(--text-tertiary); font-weight: 500; white-space: nowrap; }
  `]
})
export class ClubCardComponent {
  @Input({ required: true }) club!: Club;
  i18n = inject(I18nService);
}
