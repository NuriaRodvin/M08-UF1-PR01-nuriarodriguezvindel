import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Jugador } from './jugador.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.page.html',
  styleUrls: ['./player-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NgFor
  ]
})
export class PlayerListPage {
  jugadores: Jugador[] = [
    {
      id: 1,
      nombre: 'LeBron',
      apellidos: 'James',
      altura: '2,06',
      peso: '113',
      equipo: 'Los Ángeles Lakers',
      camaraEstado: '',
      compartirEstado: ''
    },
    {
      id: 2,
      nombre: 'Stephen',
      apellidos: 'Curry',
      altura: '1,88',
      peso: '84',
      equipo: 'Guerreros del Estado Dorado',
      camaraEstado: '',
      compartirEstado: ''
    },
    {
      id: 3,
      nombre: 'Luka',
      apellidos: 'Doncic',
      altura: '2,01',
      peso: '104',
      equipo: 'Mavericks de Dallas',
      camaraEstado: '',
      compartirEstado: ''
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  abrirCamara(jugador: Jugador) {
    jugador.camaraEstado = 'Abriendo cámara...';
    this.cdr.detectChanges();
    setTimeout(() => {
      jugador.camaraEstado = 'Cámara activada';
      this.cdr.detectChanges();
    }, 1500);
  }

  compartirJugador(jugador: Jugador) {
    jugador.compartirEstado = 'Compartiendo...';
    this.cdr.detectChanges();
    setTimeout(() => {
      jugador.compartirEstado = 'Web compartida';
      this.cdr.detectChanges();
    }, 1500);
  }
}





