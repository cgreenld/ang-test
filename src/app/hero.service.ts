import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { BackendService } from './backend.service';
import { Logger } from './logger.service';
import { DarklyService } from './darkly.service';

@Injectable()
export class HeroService {
  private heroes: Hero[] = [];
  private emptyHeroes: Hero[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger,
    private darkly: DarklyService) { }

  getHeroes() {
    if (this.darkly.ldClient.variation("beta_users",false)) {
      this.logger.log(`Fetched flag ${this.darkly.ldClient.variation("beta_users",false)}`);
      return this.emptyHeroes;
    } else {
      this.backend.getAll(Hero).then( (heroes: Hero[]) => {
        this.logger.log(`Fetched ${heroes.length} heroes.`);
        this.heroes.push(...heroes); // fill cache
      });
      return this.heroes;
    }
  }
}
