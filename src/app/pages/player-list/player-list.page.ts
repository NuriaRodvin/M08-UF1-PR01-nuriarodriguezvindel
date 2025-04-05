import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Jugador } from './jugador.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.page.html',
  styleUrls: ['./player-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class PlayerListPage {
  jugadores: Jugador[] = [
    {
      id: 1,
      nombre: 'LeBron',
      apellidos: 'James',
      equipo: 'Los Ángeles Lakers',
      altura: '2,06',
      peso: '113',
      imagen: 'assets/img/lebron.jpeg',
      camaraEstado: '',
      compartirEstado: '',
      favorito: false,
      pais: 'Estados Unidos',
      numero: 23,
      posicion: 'Alero'
    },
    {
      id: 2,
      nombre: 'Stephen',
      apellidos: 'Curry',
      equipo: 'Guerreros del Estado Dorado',
      altura: '1,88',
      peso: '84',
      imagen: 'assets/img/curry.jpeg',
      camaraEstado: '',
      compartirEstado: '',
      favorito: false,
      pais: 'Estados Unidos',
      numero: 30,
      posicion: 'Base'
    },
    {
      id: 3,
      nombre: 'Luka',
      apellidos: 'Doncic',
      equipo: 'Mavericks de Dallas',
      altura: '2,01',
      peso: '104',
      imagen: 'assets/img/doncic.jpeg',
      camaraEstado: '',
      compartirEstado: '',
      favorito: false,
      pais: 'Eslovenia',
      numero: 77,
      posicion: 'Escolta'
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastController: ToastController
  ) {}

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
        source: CameraSource.Camera
      });

      console.log('📸 Imagen capturada:', image.webPath);
    } catch (error) {
      console.error('Error al abrir la cámara', error);
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

  irADetalle(jugador: Jugador) {
    this.router.navigateByUrl('/player-detail', { state: { jugador } });
  }

  async marcarFavorito(jugador: Jugador) {
    jugador.favorito = !jugador.favorito;

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





