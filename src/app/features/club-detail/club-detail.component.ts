import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { Club, Comment } from '../../core/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, SlicePipe],
  template: `
    @if (club) {
      <section class="club-detail-page">
        <div class="club-hero">
          <div class="club-hero-bg" [style.background-image]="'url(' + club.coverImage + ')'"></div>
          <div class="club-hero-overlay"></div>
          <div class="container club-hero-content">
            <a routerLink="/clubs" class="back-link">← {{ i18n.t('general.back') }}</a>
            <span class="badge badge-gold">{{ i18n.t(club.category) }}</span>
            <h1 id="club-title">{{ i18n.t(club.name) }}</h1>
            <p class="club-desc">{{ i18n.t(club.description) }}</p>
            <div class="club-hero-meta">
              <span>{{ club.members.length }}/{{ club.maxMembers }} {{ i18n.t('clubs.members') }}</span>
              <button class="btn btn-primary" id="join-club-btn" (click)="joined.set(!joined())">
                {{ joined() ? i18n.t('clubs.joined') : i18n.t('clubs.join') }}
              </button>
            </div>
          </div>
        </div>
        <div class="container club-body">
          <div class="club-grid">
            <!-- Discussion -->
            <div class="club-discussion card">
              <h2>{{ i18n.t('clubs.discussion') }}</h2>
              <div class="comments-list">
                @for (comment of comments; track comment.id) {
                  <div class="comment">
                    <img [src]="comment.userAvatar" [alt]="comment.userName" class="avatar avatar-sm" />
                    <div class="comment-body">
                      <div class="comment-header">
                        <strong>{{ comment.userName }}</strong>
                        <span class="comment-date">{{ comment.createdAt | slice:0:10 }}</span>
                      </div>
                      <p>{{ comment.content }}</p>
                    </div>
                  </div>
                }
              </div>
              <div class="comment-form">
                <input type="text" class="form-input" [placeholder]="i18n.t('clubs.addComment')" [(ngModel)]="newComment" id="comment-input" />
                <button class="btn btn-primary btn-sm" (click)="addComment()" id="send-comment">{{ i18n.t('clubs.send') }}</button>
              </div>
            </div>
            <!-- Members -->
            <div class="club-members card">
              <h2>{{ i18n.t('clubs.membersList') }}</h2>
              <div class="members-list">
                @for (member of club.members; track member.id) {
                  <div class="member-item">
                    <img [src]="member.avatar" [alt]="member.name" class="avatar avatar-sm" />
                    <div class="member-info">
                      <span class="member-name">{{ member.name }}</span>
                      <span class="member-role badge" [class.badge-gold]="member.role==='owner'" [class.badge-navy]="member.role!=='owner'">{{ member.role }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  `,
  styles: [`
    .club-hero { position: relative; padding: calc(var(--header-height) + var(--space-10)) 0 var(--space-16); overflow: hidden; }
    .club-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: blur(30px) brightness(0.3); transform: scale(1.2); }
    .club-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(27,31,59,0.8), rgba(27,31,59,0.95)); }
    .club-hero-content { position: relative; z-index: 1; }
    .back-link { display: block; width: fit-content; color: rgba(247,244,239,0.6); font-size: var(--text-sm); margin-bottom: var(--space-6); transition: color var(--transition-fast); }
    .back-link:hover { color: var(--color-secondary); }
    .club-hero-content h1 { font-size: var(--text-4xl); color: var(--text-inverse); margin: var(--space-4) 0 var(--space-3); }
    .club-desc { color: rgba(247,244,239,0.7); font-size: var(--text-lg); max-width: 600px; margin-bottom: var(--space-6); }
    .club-hero-meta { display: flex; align-items: center; gap: var(--space-6); color: rgba(247,244,239,0.5); font-size: var(--text-sm); }
    .club-body { padding: var(--space-10) 0; }
    .club-grid { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); align-items: start; }
    .club-discussion, .club-members { padding: var(--space-6); }
    .club-discussion h2, .club-members h2 { font-size: var(--text-xl); margin-bottom: var(--space-6); }
    .comments-list { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-6); max-height: 500px; overflow-y: auto; }
    .comment { display: flex; gap: var(--space-3); }
    .comment-body { flex: 1; background: var(--surface-secondary); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); }
    .comment-header { display: flex; justify-content: space-between; margin-bottom: var(--space-1); }
    .comment-header strong { font-size: var(--text-sm); }
    .comment-date { font-size: var(--text-xs); color: var(--text-tertiary); }
    .comment-body p { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; }
    .comment-form { display: flex; gap: var(--space-3); }
    .comment-form .form-input { flex: 1; }
    .members-list { display: flex; flex-direction: column; gap: var(--space-3); }
    .member-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; }
    .member-info { display: flex; align-items: center; gap: var(--space-2); }
    .member-name { font-size: var(--text-sm); font-weight: 500; }
    .member-role { font-size: var(--text-xs); text-transform: capitalize; }
    @media (max-width: 768px) { .club-grid { grid-template-columns: 1fr; } }
  `]
})
export class ClubDetailComponent implements OnInit {
  i18n = inject(I18nService);
  private data = inject(MockDataService);
  private route = inject(ActivatedRoute);
  club: Club | undefined;
  comments: Comment[] = [];
  joined = signal(false);
  newComment = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.club = this.data.getClubById(id);
    if (this.club) { this.comments = this.data.getCommentsByClub(id); }
  }

  addComment(): void {
    if (this.newComment.trim() && this.club) {
      const user = this.data.getCurrentUser();
      this.comments.push({ id: Date.now(), userId: user.id, userName: user.name, userAvatar: user.avatar, content: this.newComment, createdAt: new Date().toISOString(), clubId: this.club.id });
      this.newComment = '';
    }
  }
}
