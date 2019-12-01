import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { BookI } from '../Models/book.model';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  apiUrl = 'http://localhost3000';
  private token: string;
  authSubject = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }
    login(data){
      return this.http.post<{access_token:  string}>('http://localhost:3000/login', data).pipe(tap(
        res=>{
          localStorage.setItem('access_token', res.access_token);
        }))
    }
    register(data){
      return this.http.post<{access_token:  string}>('http://localhost:3000/', data).pipe(tap(
        res=>{
        this.login(data);
        }))
    }
    getBooks(){
      return this.http.get<BookI>('http://localhost:3000/');
    }
    logout() {
      localStorage.removeItem('acces_token');
    }
    public get loggedIn(): boolean{
      return localStorage.getItem('acces_token') !== null;
    }
    private saveToken( token: string, expiresIn: string): void{
      localStorage.setItem("ACCES_TOKEN", token);
      localStorage.setItem("EXPIRES_IN", expiresIn);
      this.token= token;
    }
  
    private getToken():string{
      if(!this.token){
        this.token = localStorage.getItem("ACCES_TOKEN");
      }
      return this.token;
    }
}