// src/app/pages/favorites/favorites.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Jugador } from '../player-list/jugador.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage {
  jugadoresFavoritos: Jugador[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const allJugadores = nav?.extras?.state?.['jugadores'];

    if (allJugadores) {
      this.jugadoresFavoritos = allJugadores.filter((j: Jugador) => j.favorito);
    }
  }

  irADetalle(jugador: Jugador) {
    this.router.navigateByUrl('/player-detail', {
      state: { jugador }
    });
  }

  volver() {
    this.router.navigateByUrl('/players');
  }
}
