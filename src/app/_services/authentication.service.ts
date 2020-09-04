import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const apiUrl = 'https://dev.tuten.cl/TutenREST/rest';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        let body = JSON.stringify(
            {  user: username }
        )
    
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('App', 'APP_BCK')
        .set('Password', password); 

        return this.http.put<any>(`${apiUrl}/user/testapis%40tuten.cl`, body, { 
            'headers': headers 
        }).pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.sessionTokenBck) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}