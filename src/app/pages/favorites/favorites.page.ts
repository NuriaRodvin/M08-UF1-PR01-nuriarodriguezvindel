import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Jugador } from '../player-list/jugador.model';
import { PlayerListPage } from '../player-list/player-list.page'; // Para acceder a los datos

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FavoritesPage {
  favoritos: Jugador[] = [];

  constructor(private router: Router) {
    const jugadores = history.state.jugadores as Jugador[] || [];
    this.favoritos = jugadores.filter(j => j.favorito);
  }

  verDetalle(jugador: Jugador) {
    this.router.navigateByUrl('/player/' + jugador.id, {
      state: { jugador }
    });
  }
}

