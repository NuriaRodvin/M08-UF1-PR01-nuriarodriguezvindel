// src/app/pages/favorites/favorites.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
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
export class FavoritesPage implements OnInit {
  jugadoresFavoritos: Jugador[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private nbaService: NbaService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    try {
      this.jugadoresFavoritos = await this.nbaService.getFavoritosFirebase();
    } catch (error) {
      console.error('Error al cargar favoritos desde Firebase', error);
    } finally {
      this.cargando = false;
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

  async eliminarFavorito(jugador: Jugador) {
    try {
      await this.nbaService.removeFavoritoFirebase(jugador.id);
      this.jugadoresFavoritos = this.jugadoresFavoritos.filter(j => j.id !== jugador.id);

      const toast = await this.toastController.create({
        message: `${jugador.nombre} eliminado de favoritos`,
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    } catch (error) {
      console.error('Error al eliminar de Firebase', error);
    }
  }
}

