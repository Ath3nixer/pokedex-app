import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokeApiService } from '../../services/poke-api.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule, AutocompleteInputComponent, PokemonCardComponent],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss'
})
export class PokemonSearchComponent {
  searchInputValue = '';
  selectedPokemon: Pokemon | null = null;
  minAutocompleteLength = 2; // Configura la longitud mínima para el autocompletado

  constructor(private pokeApiService: PokeApiService) {}

  searchPokemon(name: string): void {
    if (name) {
      this.pokeApiService.getPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => {
          this.selectedPokemon = pokemon;
        },
        error: (error) => {
          console.error('Error al buscar Pokémon:', error);
          this.selectedPokemon = null;
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      });
    } else {
      this.selectedPokemon = null;
    }
  }

  handleSearchInput(value: string): void {
    this.searchInputValue = value;
  }
}