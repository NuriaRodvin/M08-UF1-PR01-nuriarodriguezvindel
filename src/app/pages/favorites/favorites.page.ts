// src/app/pages/favorites/favorites.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Jugador } from '../player-list/jugador.model';
import { NbaService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage {
  jugadoresFavoritos: Jugador[] = [];

  constructor(
    private router: Router,
    private nbaService: NbaService
  ) {}

  ionViewWillEnter() {
    // Recarga favoritos actualizados desde el servicio (y localStorage)
    this.jugadoresFavoritos = this.nbaService.getFavoritos();
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

