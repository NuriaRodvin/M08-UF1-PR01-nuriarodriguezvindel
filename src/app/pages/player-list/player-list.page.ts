// src/app/pages/player-list/player-list.page.ts
import {
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Jugador } from './jugador.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { Router, RouterModule } from '@angular/router';
import { NbaService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.page.html',
  styleUrls: ['./player-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class PlayerListPage {
  jugadores: Jugador[] = [];

  constructor(
    private nbaService: NbaService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const jugadoresIniciales: Jugador[] = [
      {
        id: 1,
        nombre: 'LeBron',
        apellidos: 'James',
        equipo: 'Los Ángeles Lakers',
        altura: '2,06',
        peso: 113,
        imagen: 'assets/img/lebron.jpg',
        favorito: false,
        camaraEstado: '',
        compartirEstado: '',
        pais: 'Estados Unidos',
        numero: 23,
        posicion: 'Alero'
      },
      {
        id: 2,
        nombre: 'Stephen',
        apellidos: 'Curry',
        equipo: 'Golden State Warriors',
        altura: '1,88',
        peso: 84,
        imagen: 'assets/img/curry.png',
        favorito: false,
        camaraEstado: '',
        compartirEstado: '',
        pais: 'Estados Unidos',
        numero: 30,
        posicion: 'Base'
      },
      {
        id: 3,
        nombre: 'Luka',
        apellidos: 'Doncic',
        equipo: 'Dallas Mavericks',
        altura: '2,01',
        peso: 104,
        imagen: 'assets/img/doncic.jpg',
        favorito: false,
        camaraEstado: '',
        compartirEstado: '',
        pais: 'Eslovenia',
        numero: 77,
        posicion: 'Escolta'
      }
    ];

    this.jugadores = jugadoresIniciales;

    this.nbaService.getPlayers().subscribe(response => {
      const nuevos = response.data.slice(0, 3).map((player: any) => ({
        id: player.id,
        nombre: player.first_name,
        apellidos: player.last_name,
        equipo: player.team.full_name,
        altura: player.height_feet ? `${player.height_feet},${player.height_inches}` : 'N/A',
        peso: player.weight_pounds ?? 'N/A',
        imagen: 'assets/img/default.jpg',
        camaraEstado: '',
        compartirEstado: '',
        favorito: false,
        pais: 'Desconocido',
        numero: player.id,
        posicion: player.position || 'N/A'
      }));

      this.jugadores = [...jugadoresIniciales, ...nuevos];
      this.nbaService.setJugadores(this.jugadores);
    });
  }

  irADetalle(jugador: Jugador) {
    this.router.navigateByUrl('/player-detail', {
      state: { jugador }
    });
  }

  playSound(nombre: string) {
    const audio = new Audio(`assets/sounds/${nombre}`);
    audio.play();
  }

  async abrirCamara(jugador: Jugador) {
    jugador.camaraEstado = 'Abriendo cámara...';
    this.playSound('camera.mp3');
    this.cdr.detectChanges();

    setTimeout(() => {
      jugador.camaraEstado = 'Cámara activada';
      this.cdr.detectChanges();
    }, 1500);

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt // Permite elegir entre cámara o galería
      });

      if (image.webPath) {
        jugador.imagen = image.webPath;
        this.cdr.detectChanges(); // Forzar actualización de la vista
        console.log('📸 Imagen actualizada:', image.webPath);
      }
    } catch (error) {
      console.error('Error al capturar imagen', error);
    }
  }

  async compartirJugador(jugador: Jugador) {
    jugador.compartirEstado = 'Compartiendo...';
    this.playSound('share.mp3');
    this.cdr.detectChanges();

    setTimeout(() => {
      jugador.compartirEstado = 'Web compartida';
      this.cdr.detectChanges();
    }, 1500);

    try {
      await Share.share({
        title: 'NBA Rookie',
        text: `¡Mira este jugador! ${jugador.nombre} ${jugador.apellidos}`,
        url: 'https://nba.com',
        dialogTitle: 'Compartir jugador'
      });
    } catch (error) {
      console.error('Error al compartir', error);
    }
  }

  async marcarFavorito(jugador: Jugador) {
    jugador.favorito = !jugador.favorito;

    if (jugador.favorito) {
      await this.nbaService.addFavoritoFirebase(jugador);
    } else {
      await this.nbaService.removeFavoritoFirebase(jugador.id);
    }

    const toast = await this.toastController.create({
      message: jugador.favorito
        ? `${jugador.nombre} añadido a favoritos`
        : `${jugador.nombre} eliminado de favoritos`,
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }
}
