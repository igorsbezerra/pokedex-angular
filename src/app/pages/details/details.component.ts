import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  pokemon: any;
  isLoading: boolean = false;
  apiError: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activeRoute.snapshot.params['id'];
    const pokemon = this.service.apiGetPokemon(id);
    const name = this.service.apiGetPokemonName(id);
    return forkJoin([pokemon, name]).subscribe(
      (response) => {
        this.pokemon = response;
        this.isLoading = true;
      },
      () => {
        this.apiError = true;
      }
    );
  }
}
