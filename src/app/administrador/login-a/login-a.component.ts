import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-a',
  templateUrl: './login-a.component.html',
  styleUrls: ['./login-a.component.css'],
})
export class LoginAComponent {
  email: string = '';
  password: string = '';
  jsonResponse: String = '';

  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit() {
    //Inicialización de un login
    const loginData: Login = {
      id: 0,
      nombre: '',
      correo: this.email,
      contraseña: this.password,
    };
    this.loginService.login(loginData).subscribe(
      (response: any) => {
        this.jsonResponse = response.error.text;
      },

      // Como el Api-rest retorna un ResponseEntity<String>, obtendremos un JSON que siempre redireccionará en el error, pero el campo del resultado está en el JSON.error.text;
      (error: any) => {
        this.jsonResponse = error.error.text;

        //Credenciales correctas
        if (this.jsonResponse === 'Inicio de sesión exitoso') {
          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'Inicio de sesión exitoso',
            confirmButtonText: 'Aceptar',
          });

          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/administrador/equipo']);

        //Credenciales incorrectas
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Credenciales inválidas',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    );
  }
}
