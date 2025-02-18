import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Router } from '@angular/router';
import { Users_Service } from '../../services/users.service';

@Component({
  selector: 'app-mis-clubs',
  templateUrl: './mis-clubs.component.html',
  styleUrls: ['./mis-clubs.component.css']
})
export class MisClubsComponent implements OnInit {
  ownedClubs: any[] = [];
  memberClubs: any[] = [];
  clubs: any[] = [];
  userId: number | null = null;
  selectedClubId: number | null = null;
  showModal: boolean = false;

  constructor(private clubService: ClubService, private usersService: Users_Service, private router: Router) {}

  ngOnInit() {
    this.clubService.getClubs().subscribe({
      next: (data) => {
        this.clubs = data;
      },
      error: (error) => {
        console.error('Error al obtener los clubs', error);
      }
    });

    this.usersService.getUserData().subscribe({
      next: (data) => {
        this.userId = data.id;
        this.loadOwnedClubs();
        this.loadMemberClubs();
      },
      error: (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    });
  }

  loadOwnedClubs() {
    this.clubService.getClubsByUser().subscribe({
      next: (data) => {
        this.ownedClubs = data;
      },
      error: (error) => {
        console.error('Error al obtener los clubs creados', error);
      }
    });
  }

  loadMemberClubs() {
    this.clubService.getClubsAsMember().subscribe({
      next: (data) => {
        this.memberClubs = data;
      },
      error: (error) => {
        console.error('Error al obtener los clubs como miembro', error);
      }
    });
  }

  agregarClub() {
    this.router.navigate(['/agregarClub']);
  }

  verClub(id: number) {
    this.router.navigate([`/verClub/${id}`]);
  }

  joinClub(id: number) {
    this.selectedClubId = id;
    this.showModal = true;
  }

  onJoinClub(data: { email: string; age: number }) {
    if (this.selectedClubId !== null) {
      this.clubService.joinClub(this.selectedClubId, data.email, data.age).subscribe({
        next: (response) => {
          console.log('Unido al club:', response);
          this.showModal = false;
          this.loadMemberClubs(); // Recargar los clubs como miembro
        },
        error: (error) => {
          console.error('Error al unirse al club', error);
          console.log(this.selectedClubId);
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
