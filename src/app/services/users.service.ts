import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Users_Service {
    private apiUrl = 'https://98.85.4.80';

    constructor(private http: HttpClient) {}

    registerUser(userData: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(`${this.apiUrl}/register`, userData, { headers });
    }

    loginUser(credentials: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
    }

    getToken(): string | null {
        // Verificar que estamos en el lado del cliente antes de acceder a localStorage
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getUserData(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
        });
        return this.http.get(`${this.apiUrl}/profile`, { headers });
    }

}
