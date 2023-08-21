import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient) {}

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(`${this.url}?offset=0&limit=100`).pipe(
      tap((response) => response),
      tap((response) => {
        response.results.map((pokemon: any) => {
          this.apiGetPokemons(pokemon.url).subscribe(
            (response) => (pokemon.status = response)
          );
        });
      })
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((response) => response));
  }

  public apiGetPokemon(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  public apiGetPokemonName(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlName}/${id}/`);
  }
}
