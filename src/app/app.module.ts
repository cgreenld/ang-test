import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';
import { SalesTaxComponent } from './sales-tax.component';
import { HeroService } from './hero.service';
import { BackendService } from './backend.service';
import { Logger } from './logger.service';
import { DarklyService } from './darkly.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent,
    SalesTaxComponent
  ],
  providers: [
    BackendService,
    HeroService,
    DarklyService,
    Logger
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
