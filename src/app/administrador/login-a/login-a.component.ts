import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';

import { InMemoryDataService } from '../../in-memory-data.service';

@Component({
  selector: 'app-login-a',
  templateUrl: './login-a.component.html',
  styleUrls: ['./login-a.component.css']
})
export class LoginAComponent {
    email: string = '';
    password: string = '';

  constructor(private router: Router, private loginService: LoginService, private inMemoryDataService: InMemoryDataService,) {}

  onSubmit() {
    
    const usuarios = this.inMemoryDataService.createDb().login;
    const usuario = usuarios.find(u => u.correo === this.email && u.contraseña === this.password);

    if (usuario) {
      Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: '¡Inicio de sesión correcto!',
        confirmButtonText: 'Aceptar'
      });

        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/administrador']);
    } else {
      
        Swal.fire({
          icon: 'error',
          title: 'ERRROR',
          text: '¡Credenciales inválidas!',
          confirmButtonText: 'Aceptar'
        });
      
    }
}
}












