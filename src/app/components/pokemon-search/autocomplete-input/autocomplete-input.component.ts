import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, map  } from 'rxjs/operators';
import { PokeApiService } from '../../../services/poke-api.service';
import { PokemonSpecies } from '../../../models/pokemon-species.model';

@Component({
  selector: 'app-autocomplete-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss'
})

export class AutocompleteInputComponent implements OnInit {
  @Input() minLength = 3;
  @Output() search = new EventEmitter<string>();
  searchTerm = new FormControl('');
  suggestions: PokemonSpecies[] = [];
  showSuggestions = false;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term !== null && term !== undefined && term.length >= this.minLength), // Añadimos la verificación de null y undefined
      switchMap(term => this.pokeApiService.getPokemonList(10, 0).pipe(
        map(response => response.results.filter((pokemon: PokemonSpecies) =>
          pokemon.name.toLowerCase().includes(term!.toLowerCase())
        ))
      ))
    ).subscribe(results => {
      this.suggestions = results;
      this.showSuggestions = true;
    });
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm.setValue(suggestion);
    this.search.emit(suggestion);
    this.suggestions = [];
    this.showSuggestions = false;
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}