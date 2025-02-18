import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'https://98.85.4.80';

  constructor(private http: HttpClient) {}

  // Obtener todos los comentarios de un club
  getAllComments(clubId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coment/club/${clubId}`);
  }

  // Obtener el ID del miembro autenticado
  getMemberId(userId: number, clubId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/members/${userId}/club/${clubId}`);
  }

  createComment(comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/coment`, comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/coment/delete/${id}`);
  }
}
