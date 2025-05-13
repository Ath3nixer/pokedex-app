import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../../services/poke-api.service';
import { PokemonSpecies } from '../../models/pokemon-species.model';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, FormsModule],
  templateUrl: './pokedex-view.component.html',
  styleUrl: './pokedex-view.component.scss'
})
export class PokedexViewComponent implements OnInit {
  pokemonDetails: (Pokemon | null)[] = []; // Array para almacenar los detalles completos de cada Pokémon
  currentPage = 1;
  itemsPerPage = 20;
  totalPokemon = 0;
  generations: { name: string; url: string }[] = [];
  selectedGeneration: string = 'all';
  loading = true;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.loadPokemonList();
    this.loadGenerations();
  }

  loadPokemonList(): void {
    this.loading = true;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokeApiService.getPokemonList(this.itemsPerPage, offset).pipe(
      switchMap(data => {
        this.totalPokemon = data.count;
        const pokemonDetailsRequests = data.results.map((pokemon: PokemonSpecies) =>
          this.pokeApiService.getPokemonByName(pokemon.name)
        );
        this.pokemonDetails = Array(data.results.length).fill(null);
        return forkJoin(pokemonDetailsRequests);
      })
    ).subscribe((details: Pokemon[]) => { // Especificamos el tipo de 'details'
      this.pokemonDetails = details;
      this.loading = false;
    });
  }

  loadGenerations(): void {
    this.pokeApiService.getGenerations().subscribe(data => {
      this.generations = data.results;
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPokemonList();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalPokemon / this.itemsPerPage);
  }

  onGenerationChange(): void {
    this.currentPage = 1;
    this.loading = true;
    if (this.selectedGeneration === 'all') {
      this.loadPokemonList();
    } else {
      this.pokeApiService.getPokemonByGeneration(this.selectedGeneration).pipe(
        switchMap(data => {
          const pokemonDetailsRequests = data.pokemon_species.map((species: any) =>
            this.pokeApiService.getPokemonByName(species.pokemon_species.name)
          );
          this.totalPokemon = pokemonDetailsRequests.length;
          this.pokemonDetails = Array(data.pokemon_species.length).fill(null);
          return forkJoin(pokemonDetailsRequests);
        })
      ).subscribe((details: Pokemon[]) => { // Especificamos el tipo de 'details'
        this.pokemonDetails = details;
        this.loading = false;
      });
    }
  }
}