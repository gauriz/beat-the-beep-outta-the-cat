import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParticleEffectButtonModule } from 'angular-particle-effect-button';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ParticleEffectButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'beat-the-beep-outta-the-cat'),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
