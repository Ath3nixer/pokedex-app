import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model'; // Importa la interfaz Pokemon

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemonByName(name: string): Observable<Pokemon> { // Especifica el tipo de retorno
    return this.http.get<Pokemon>(`${this.baseUrl}pokemon/${name}`);
  }

  getPokemonList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`);
  }

  getGenerations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}generation`);
  }

  getPokemonByGeneration(generationUrl: string): Observable<any> {
    return this.http.get<any>(generationUrl);
  }

  // Aquí irán otros métodos para interactuar con la PokeAPI
}