import { Injectable } from '@angular/core';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  // tslint:disable-next-line: typedef
  add(message: string) {
    this.messages.push(message);
  }

  // tslint:disable-next-line: typedef
  clear() {
    this.messages = [];
    this.messages.push('List of selected Heroes:');
  }

  constructor() { }
}
