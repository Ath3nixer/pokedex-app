import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  welcomeText = '¡Bienvenido al mundo Pokémon!';
  pokemonImageSmall = 'assets/pokemon_logo_small.jpeg'; // Reemplaza con la ruta a tu imagen pequeña
  pokemonImageLarge = 'assets/pokemon_large.jpeg';   // Reemplaza con la ruta a tu imagen grande

  constructor() {
    // Puedes agregar lógica de inicialización aquí si es necesario
  }
}