import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private heroUrl = 'api/heroes'; // Url for web api

  // get the array of heroes
  getHeroes(): Observable<Hero[]> {
    const url = `${this.heroUrl}`;
    return this.http.get<Hero[]>(url).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  // gets a single hero from the server
  getHero(id: string): Observable<Hero | undefined> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id: ${id}`))
    );
  }

  // updates a single hero
  updateHero(hero: Hero | undefined): Observable<any> {
    return this.http.put(this.heroUrl, hero, this.httpOptions).pipe(
      tap((_) =>
        hero != null ? this.log(`updated hero id: ${hero.id}`) : null
      ),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // Add a new hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Delete a hero
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // get hereos depending on the search results
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not trimmed term return and empty array
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}" `)
          : this.log(`didn't find any heroes for term "${term}" `)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  // tslint:disable-next-line: typedef
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // we can send the error to a remote server
      console.error(error); // logging error for now

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
