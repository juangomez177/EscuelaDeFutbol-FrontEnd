import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-a',
  templateUrl: './menu-a.component.html',
  styleUrls: ['./menu-a.component.css']
})
export class MenuAComponent {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('isLoggedIn'); // Eliminar la bandera de inicio de sesión del almacenamiento local
    this.router.navigate(['/login']); 
  }

}
