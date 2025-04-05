import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Jugador } from '../player-list/jugador.model';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PlayerDetailPage {
  jugador!: Jugador;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    const navigation = history.state;
    if (navigation && navigation.jugador) {
      this.jugador = navigation.jugador;
    }
  }

  toggleFavorito() {
    this.jugador.favorito = !this.jugador.favorito;

    this.toastController.create({
      message: this.jugador.favorito
        ? `${this.jugador.nombre} añadido a favoritos`
        : `${this.jugador.nombre} eliminado de favoritos`,
      duration: 1500,
      position: 'bottom'
    }).then(toast => toast.present());
  }

  async compartirJugador() {
    try {
      await Share.share({
        title: 'NBA Rookie',
        text: `¡Mira este jugador! ${this.jugador.nombre} ${this.jugador.apellidos}`,
        url: 'https://nba.com',
        dialogTitle: 'Compartir jugador'
      });
    } catch (error) {
      console.error('Error al compartir', error);
    }
  }

  volver() {
    this.router.navigateByUrl('/players');
  }
}




