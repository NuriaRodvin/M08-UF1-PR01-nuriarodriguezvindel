// src/app/services/nba.service.ts
import { Injectable } from '@angular/core';
import { Jugador } from '../pages/player-list/jugador.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private jugadoresFavoritos: Jugador[] = [];
  private jugadores: Jugador[] = [];

  constructor(private http: HttpClient) {
    this.cargarFavoritosDesdeLocalStorage(); // ✅ Carga inicial
  }

  // Añadir jugador a favoritos y guardar
  addFavorito(jugador: Jugador) {
    if (!this.jugadoresFavoritos.some(j => j.id === jugador.id)) {
      this.jugadoresFavoritos.push(jugador);
      this.guardarFavoritosEnLocalStorage();
    }
  }

  // Quitar jugador de favoritos y guardar
  removeFavorito(jugador: Jugador) {
    this.jugadoresFavoritos = this.jugadoresFavoritos.filter(j => j.id !== jugador.id);
    this.guardarFavoritosEnLocalStorage();
  }

  // Obtener favoritos
  getFavoritos(): Jugador[] {
    return this.jugadoresFavoritos;
  }

  // Guardar lista completa si la necesitas
  setJugadores(lista: Jugador[]) {
    this.jugadores = lista;
  }

  // Obtener jugadores desde la API pública
  getPlayers(): Observable<any> {
    return this.http.get('https://www.balldontlie.io/api/v1/players');
  }

  // Guardar favoritos en localStorage
  private guardarFavoritosEnLocalStorage() {
    localStorage.setItem('favoritos', JSON.stringify(this.jugadoresFavoritos));
  }

  // Cargar favoritos desde localStorage
  private cargarFavoritosDesdeLocalStorage() {
    const favoritosStr = localStorage.getItem('favoritos');
    if (favoritosStr) {
      this.jugadoresFavoritos = JSON.parse(favoritosStr);
    }
  }
}
