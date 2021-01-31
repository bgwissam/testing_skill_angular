import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
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

  private heroUrl = 'api/heroes'; // Url for web api


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl);
  }

  getHero(id: string): Observable<Hero | undefined> {
    this.messageService.add(`Chosen Hero id: ${id}`);
    return of(HEROES.find((hero) => hero.id === parseInt(id)));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
