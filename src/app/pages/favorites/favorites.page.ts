import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Jugador } from '../player-list/jugador.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
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

  volver() {
    this.router.navigateByUrl('/players');
  }
}


