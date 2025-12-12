import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Configuracion } from './models/configuracion';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nombre: string = '';
  apellido: string = '';
  rangoMaximo: number | null = null;
  intentos: number | null = null;

  juegoIniciado: boolean = false;
  configuracion: Configuracion | null = null;
  numeroSecreto: number = 0;
  intentoActual: number | null = null;
  intentosRestantes: number = 0;
  mensaje: string = '';
  mensajeColor: string = '';
  juegoTerminado: boolean = false;


  get nombreValido(): boolean {
    return this.nombre.trim().length > 0;
  }

  get apellidoValido(): boolean {
    return this.apellido.trim().length > 0;
  }

  get rangoValido(): boolean {
    return this.rangoMaximo !== null && this.rangoMaximo >= 4;
  }


  get intentosValidos(): boolean {
    return this.intentos !== null && this.intentos >= 1;
  }


  get formularioValido(): boolean {
    return this.nombreValido &&
      this.apellidoValido &&
      this.rangoValido &&
      this.intentosValidos;
  }


  recogerDatos(): void {
    this.configuracion = {
      nombre: this.nombre,
      apellido: this.apellido,
      rangoMaximo: this.rangoMaximo!,
      intentos: this.intentos!
    };

    this.numeroSecreto = Math.floor(Math.random() * this.rangoMaximo!);

    this.intentosRestantes = this.intentos!;
    this.juegoIniciado = true;

    console.log('Número secreto:', this.numeroSecreto);
  }

  enviarIntento(): void {
    if (this.intentoActual === null || this.juegoTerminado) {
      return;
    }

    this.intentosRestantes--;

    const diferencia = this.numeroSecreto - this.intentoActual;

    if (this.intentoActual === this.numeroSecreto) {
      this.mensaje = '🎉 ¡Has Ganado!';
      this.mensajeColor = 'green';
      this.juegoTerminado = true;
    } else if (this.intentoActual > this.numeroSecreto) {
      this.mensaje = '⬇️ Te pasaste';
      this.mensajeColor = 'purple';
    } else if (diferencia === 1) {
      this.mensaje = '🔥 Caliente';
      this.mensajeColor = 'red';
    } else if (diferencia === 2) {
      this.mensaje = '☀️ Templado';
      this.mensajeColor = 'orange';
    } else {
      this.mensaje = '❄️ Frío';
      this.mensajeColor = 'blue';
    }
    if (this.intentosRestantes === 0 && !this.juegoTerminado) {
      this.mensaje = `😢 ¡Perdiste! El número era ${this.numeroSecreto}`;
      this.mensajeColor = 'gray';
      this.juegoTerminado = true;
    }
    this.intentoActual = null;
  }

  reiniciarJuego(): void {
    this.juegoIniciado = false;
    this.juegoTerminado = false;
    this.configuracion = null;
    this.mensaje = '';
    this.intentoActual = null;
  }
}
