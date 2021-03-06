import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router, Data } from '@angular/router';
import { BookI } from '../Models/book.model';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  public books =[];
  constructor(private Services: ServicesService, private router:Router) { }
  filterBook='';
  ngOnInit() {
    this.Services.getBooks()
    .subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
  }

  /*showInfo(){
    this.Services.getBooks()
    .subscribe((data: BookI) => this.book = { 
      titulo: (data as any).titulo,
      ISBN: (data as any).ISBN,
      precio: (data as any).precio,
      descripcion: (data as any).descripcion,
      autor: (data as any).autor, 
      editorial: (data as any).editorial,
    });
    }
    */
}
