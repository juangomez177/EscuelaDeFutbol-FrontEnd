//Componente principal
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Escuela de Futbol';

  ngOnInit(): void {
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Bienvenido',
    //   text: '¡Gracias por visitar nuestra página!',
    //   confirmButtonText: 'Aceptar'
    // });
  }

  mostrarSweetAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'SweetAlert',
      text: '¡Hola desde SweetAlert!',
      confirmButtonText: 'Aceptar'
    });
  }
  
  mostrarSweetAlertError(): void {
    Swal.fire({
      icon: 'error',
      title: 'SweetAlert de error',
      text: '¡Se ha producido un error!',
      confirmButtonText: 'Aceptar'
    });
  }

}
