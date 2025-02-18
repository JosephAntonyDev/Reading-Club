import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Users_Service } from '../../services/users.service';

@Component({
  selector: 'app-agregar-libros',
  templateUrl: './agregar-libros.component.html',
  styleUrls: ['./agregar-libros.component.css']
})
export class AgregarLibrosComponent implements OnInit {
  bookForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private usersService: Users_Service,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      date: ['', Validators.required],
      state: ['', Validators.required],
      review: ['', Validators.required],
      user_Id: ['']
    });
  }

  ngOnInit() {
    this.usersService.getUserData().subscribe({
      next: (data) => {
        this.userId = data.id;
        this.bookForm.patchValue({ user_Id: this.userId });
      },
      error: (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (response) => {
          console.log('Libro agregado:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al agregar libro:', error);
        }
      });
    }
  }
}
