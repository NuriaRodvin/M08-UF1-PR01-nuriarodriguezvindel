// src/app/services/nba.service.ts
import { Injectable } from '@angular/core';
import { Jugador } from '../pages/player-list/jugador.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private jugadores: Jugador[] = [];
  private apiKey = '050f334b-eef1-40b0-ae42-f4b2ebb95c72';

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getPlayers(page = 1, per_page = 20): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });
    return this.http.get(`https://api.balldontlie.io/v1/players?page=${page}&per_page=${per_page}`, { headers });
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
