import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubService } from '../../services/club.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Users_Service } from '../../services/users.service';

@Component({
  selector: 'app-agregar-clubs',
  templateUrl: './agregar-clubs.component.html',
  styleUrls: ['./agregar-clubs.component.css']
})
export class AgregarClubsComponent implements OnInit {
  clubForm: FormGroup;
  books: any[] = [];
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private bookService: BookService,
    private usersService: Users_Service,
    private router: Router
  ) {
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      members: ['', Validators.required],
      date: ['', Validators.required],
      idBook: ['', Validators.required],
      description: ['', Validators.required],
      idOwner: [''] // Este campo se actualizará con el ID del usuario autenticado
    });
  }

  ngOnInit(): void {
    // Obtener los datos del usuario autenticado
    this.usersService.getUserData().subscribe({
      next: (data) => {
        this.userId = data.id;
        this.clubForm.patchValue({ idOwner: this.userId });
        this.loadBooks(); // Cargar los libros después de obtener el userId
      },
      error: (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    });
  }

  loadBooks() {
    if (this.userId !== null) { // Asegurarse de que userId no sea null
      this.bookService.getBooksByUser(this.userId).subscribe({
        next: (response) => {
          this.books = response;
        },
        error: (error) => {
          console.error('Error al obtener los libros:', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.clubForm.valid) {
      this.clubService.addClub(this.clubForm.value).subscribe({
        next: (response) => {
          console.log('Club creado:', response);
          this.router.navigate(['/misClubs']);
        },
        error: (error) => {
          console.error('Error al crear un club:', error);
        }
      });
    }
  }
}
