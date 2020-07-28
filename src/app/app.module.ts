import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParticleEffectButtonModule } from 'angular-particle-effect-button';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ParticleEffectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
