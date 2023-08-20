import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  pokemons: any;
  private filteredPokemons: any;

  constructor(private service: PokeApiService) {}

  ngOnInit(): void {
    this.service.apiListAllPokemons.subscribe((response) => {
      this.filteredPokemons = response.results;
      this.pokemons = response.results;
    });
  }

  search(value: string): void {
    const filter = this.filteredPokemons.filter(
      (pokemon: any) => !pokemon.name.indexOf(value.toLowerCase())
    );
    this.pokemons = filter;
  }
}
