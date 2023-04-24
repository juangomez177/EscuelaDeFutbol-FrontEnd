import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-a',
  templateUrl: './login-a.component.html',
  styleUrls: ['./login-a.component.css']
})
export class LoginAComponent {
    email: string = '';
    password: string = '';


  constructor(private router: Router) {}

  onSubmit() {

    
    if (this.email === 'a' && this.password === '1') {
      localStorage.setItem('isLoggedIn', 'true'); // Establecer la bandera de inicio de sesión en el almacenamiento local
      this.router.navigate(['/administrador']); 
    } else {
     
     
      alert('Correo electrónico o contraseña incorrectos.');
    }
  }
}












