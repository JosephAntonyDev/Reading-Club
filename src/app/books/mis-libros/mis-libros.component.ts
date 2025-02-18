import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Users_Service } from '../../services/users.service';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.css']
})
export class MisLibrosComponent implements OnInit {
  libros: any[] = [];
  userId: number | null = null;

  constructor(
    private bookService: BookService,
    private usersService: Users_Service,
    private router: Router
  ) {}

  ngOnInit() {
    this.usersService.getUserData().subscribe({
      next: (data) => {
        this.userId = data.id;
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    });
  }

  loadBooks() {
    if (this.userId) {
      this.bookService.getBooksByUser(this.userId).subscribe({
        next: (data) => {
          this.libros = data;
        },
        error: (error) => {
          console.error('Error al obtener libros:', error);
        }
      });
    }
  }

  agregarLibro() {
    this.router.navigate(['/agregarLibro']);
  }

  verLibro(id: number) {
    this.router.navigate([`/verLibro/${id}`]);
  }
}
