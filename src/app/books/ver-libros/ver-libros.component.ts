import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-libros',
  templateUrl: './ver-libros.component.html',
  styleUrls: ['./ver-libros.component.css']
})
export class VerLibrosComponent implements OnInit {
  libro: any;
  editableLibro: any;
  editMode: boolean = false;
  showModal: boolean = false;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID desde la URL
  
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (data) => {
          this.libro = data;
        },
        error: (error) => {
          console.error('Error al obtener los detalles del libro:', error);
        }
      });
    }
  }

  openModal() {
    this.showModal = true; 
  }

  closeModal() {
    this.showModal = false; 
  }

  confirmDelete() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del libro

    if (id) {
      this.bookService.deleteBook(id).subscribe({
        next: (deleteBook) => {
          console.log('Libro eliminado:', deleteBook);
          this.libro = null; // Eliminar el libro de la vista
          this.closeModal(); // Cerrar la modal después de eliminar
          // Redirigir al inicio después de eliminar
        this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al eliminar el libro:', error);
        }
      });
    }
  }

  // Activar modo de edición
  edit() {
    this.editMode = true;
    this.editableLibro = { ...this.libro }; // Copiar datos del libro para edición
  }

  // Cancelar la edición
  cancel() {
    this.editMode = false;
    this.editableLibro = { ...this.libro }; // Restaurar los datos originales
  }

  // Guardar los cambios y enviar la actualización a la API
  save() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del libro

    if (id && this.editableLibro) {
      this.bookService.updateBook(id, this.editableLibro).subscribe({
        next: (updatedBook) => {
          this.libro = updatedBook; // Actualizar los datos del libro en la vista
          this.editMode = false;    // Salir del modo de edición
        },
        error: (error) => {
          console.error('Error al actualizar el libro:', error);
        }
      });
    }
  }
}
