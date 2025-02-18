import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'https://98.85.4.80';

  constructor(private http: HttpClient) { }

  // Obtener todos los clubs
  getClubs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clubs`);
  }

  // Obtener detalles de un club
  getClubById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/club/${id}`);
  }

  // Crear un club nuevo
  addClub(clubData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/clubs`, clubData, { headers });
  }

  // Eliminar un club
  deleteClub(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clubs/delete/${id}`);
  }

  // Actualizar un club
  updateClub(id: string, clubData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clubs/${id}`, clubData);
  }

  // Obtener todos los libros
  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/books`);
  }

  // Obtener clubs creados por el usuario
  getClubsByUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/clubs/user`, { headers });
  }

  // Obtener clubs donde el usuario es miembro
  getClubsAsMember(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/clubs/member`, { headers });
  }

  // Unirse a un club
  joinClub(idClub: number, email: string, age: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/members/join`, { idClub, email, age }, { headers });
  }
}
