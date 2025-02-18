import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users_Service } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://98.85.4.80';

  constructor(private http: HttpClient, private usersService: Users_Service) { }

  // Obtener todos los libros del usuario autenticado
  getBooksByUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.usersService.getToken()}`
    });
    return this.http.get(`${this.apiUrl}/books/user/${userId}`, { headers });
  }

  // Crear un libro nuevo
  addBook(bookData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/books`, bookData, { headers });
  }

  // Obtener detalles de un libro
  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/book/${id}`);
  }

  // Actualizar un libro
  updateBook(id: string, bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${id}`, bookData);
  }

  // Eliminar un libro
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/delete/${id}`);
  }
}
