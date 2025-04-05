// src/app/pages/player-detail/player-detail.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Jugador } from '../player-list/jugador.model';
import { NbaService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss']
})
export class PlayerDetailPage {
  jugador?: Jugador;

  constructor(
    private router: Router,
    private nbaService: NbaService,
    private toastController: ToastController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.jugador = nav?.extras?.state?.['jugador'];
  }

  async toggleFavorito() {
    if (!this.jugador) return;

    this.jugador.favorito = !this.jugador.favorito;

    if (this.jugador.favorito) {
      await this.nbaService.addFavoritoFirebase(this.jugador);
    } else {
      await this.nbaService.removeFavoritoFirebase(this.jugador.id);
    }

    const toast = await this.toastController.create({
      message: this.jugador.favorito
        ? `${this.jugador.nombre} añadido a favoritos`
        : `${this.jugador.nombre} eliminado de favoritos`,
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }

  volver() {
    this.router.navigateByUrl('/players');
  }
}





