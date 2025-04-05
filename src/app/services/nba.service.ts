// src/app/services/nba.service.ts
import { Injectable } from '@angular/core';
import { Jugador } from '../pages/player-list/jugador.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private jugadores: Jugador[] = [];

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getPlayers(): Observable<any> {
    return this.http.get('https://www.balldontlie.io/api/v1/players');
  }

  setJugadores(lista: Jugador[]) {
    this.jugadores = lista;
  }

  addFavoritoFirebase(jugador: Jugador) {
    const favsRef = collection(this.firestore, 'favoritos');
    return addDoc(favsRef, jugador);
  }

  async getFavoritosFirebase(): Promise<Jugador[]> {
    const favsRef = collection(this.firestore, 'favoritos');
    const snapshot = await getDocs(favsRef);
    return snapshot.docs.map(doc => doc.data() as Jugador);
  }

  async removeFavoritoFirebase(jugadorId: number): Promise<void> {
    const favsRef = collection(this.firestore, 'favoritos');
    const snapshot = await getDocs(favsRef);
    const toDelete = snapshot.docs.find(doc => doc.data()['id'] === jugadorId);
    if (toDelete) {
      await deleteDoc(doc(this.firestore, 'favoritos', toDelete.id));
    }
  }
}
