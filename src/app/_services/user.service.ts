import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
const apiUrl = 'https://dev.tuten.cl/TutenREST/rest';
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<User[]>(`${apiUrl}/users`);
    }

    getUserBookings(user: any) {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('App', 'APP_BCK')
        .set('email', 'contacto@tuten.cl') 
        .set('adminemail', user.email)
        .set('token', user.sessionTokenBck); 

        return this.http.get<any>(`${apiUrl}/user/contacto%40tuten.cl/bookings?current=true`,{'headers': headers });
    }

    getById(id: number) {
        return this.http.get(`${apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${apiUrl}/users/` + id);
    }
}