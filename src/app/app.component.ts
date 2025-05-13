import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { PokedexViewComponent } from './components/pokedex-view/pokedex-view.component';
import { PokeApiService } from './services/poke-api.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HomeComponent, PokemonSearchComponent, PokedexViewComponent], 
  providers: [PokeApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex-app';
  private http = inject(HttpClient);

  constructor() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/1').subscribe(data => {
      console.log('Petición de prueba a la API:', data);
    });
  }
}