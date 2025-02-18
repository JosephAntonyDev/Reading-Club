import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { Users_Service } from '../../services/users.service';

@Component({
  selector: 'app-ver-clubs',
  templateUrl: './ver-clubs.component.html',
  styleUrls: ['./ver-clubs.component.css']
})
export class VerClubsComponent implements OnInit {
  clubInfo: any;
  editableClub: any;
  editMode: boolean = false;
  showModal: boolean = false;
  comentarios: any[] = []; // Lista de comentarios
  nuevoComentario: string = ''; // Almacenar nuevo comentario
  userId: number | null = null; // Para obtener el ID del usuario autenticado
  userName: string | null = null; // Para obtener el nombre del usuario autenticado

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private memberService: MemberService,
    private usersService: Users_Service,
    private router: Router
  ) {}

  ngOnInit() {
    this.usersService.getUserData().subscribe({
      next: (data) => {
        this.userId = data.id;
        this.userName = data.name_User; // Asume que el nombre de usuario se llama 'name_User'
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
          this.clubService.getClubById(id).subscribe({
            next: (data) => {
              this.clubInfo = data;
              this.loadComments(parseInt(id, 10));
            },
            error: (error) => {
              console.error('Error al obtener los detalles del club');
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    });
  }

  openModal() {
    this.showModal = true; // Mostrar modal
  }

  closeModal() {
    this.showModal = false; // Ocultar modal
  }

  confirmDelete() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del club

    if (id) {
      this.clubService.deleteClub(id).subscribe({
        next: (deleteClub) => {
          console.log('Club eliminado:', deleteClub);
          this.clubInfo = null; // Eliminar el club de la vista
          this.closeModal(); // Cerrar la modal después de eliminar
          // Redirigir al inicio después de eliminar
          this.router.navigate(['/misClubs']);
        },
        error: (error) => {
          console.error('Error al eliminar el club:', error);
        }
      });
    }
  }

  edit() {
    this.editMode = true;
    this.editableClub = { ...this.clubInfo };
  }

  cancel() {
    this.editMode = false;
    this.editableClub = { ...this.clubInfo };
  }

  save() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && this.editableClub) {
      this.clubService.updateClub(id, this.editableClub).subscribe({
        next: (updateClub) => {
          this.clubInfo = updateClub; //actualizar los datos del club
          this.editMode = false;
        }
      });
    }
  }

  loadComments(clubId: number) {
    this.memberService.getAllComments(clubId).subscribe({
      next: (data) => {
        this.comentarios = data;
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
      }
    });
  }

  agregarComentario() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del club
    if (this.nuevoComentario.trim() && id && this.userId !== null && this.userName !== null) {
      const nuevoComentario = {
        comments: this.nuevoComentario,
        idClub: parseInt(id, 10), // Asegura que el comentario esté asociado al club actual
        userName: this.userName // Incluye el nombre del usuario en el comentario
      };
      console.log("Datos del nuevo comentario:", nuevoComentario);
      this.memberService.createComment(nuevoComentario).subscribe({
        next: (data) => {
          this.comentarios.push(data); // Agrega el nuevo comentario a la lista
          this.nuevoComentario = ''; // Limpia el campo
        },
        error: (error) => {
          console.error('Error al agregar el comentario:', error);
        }
      });
    } else {
      console.error('El comentario no puede estar vacío');
    }
  }
}
