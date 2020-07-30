import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

export interface DataUser {
  username: string,
  highscore: number,
  userId: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'beat-the-beep-outta-the-cat';
  items;
  totalDeck = 3;
  gridNumber: number;
  hidden = true;
  winCount = 0;
  showModal = true;
  content = '';
  buttonText = 'Start';
  name = '';
  lastHighScore = 0;
  userId: any;
  dogNumber: number;
  showTopScores = false;
  topScores: { username: string; highscore: number; userId: string; id: string; }[] = [];
  constructor(private appTitle: Title, private firestore: AngularFirestore, private db: AngularFireDatabase) {
    this.appTitle.setTitle('Beat The Beep Outta The Cat!');
  }

  ngOnInit(): void {
    this.items = Array.from(Array(this.totalDeck * this.totalDeck), (_, i) => i + 1);
    this.randomNumberGenerator();
    this.randomDogGenerator();
  }

  randomNumberGenerator(): void {
    this.hidden = false;
    this.gridNumber = Math.floor(Math.random() * (this.totalDeck * this.totalDeck)) + 1;
    if (this.winCount % 3 === 0) {
      this.randomDogGenerator();
    } else {
      this.dogNumber = -1;
    }
  }

  randomDogGenerator(): void {
    let dogNumber = Math.floor(Math.random() * (this.totalDeck * this.totalDeck)) + 1;
    if (dogNumber === this.gridNumber) {
      this.randomDogGenerator();
    } else {
      this.dogNumber = dogNumber;
    }
  }

  checkClick(hidden): void {
    if (!hidden) {
      this.show();
    }
  }

  catClicked(item): void {
    if (item === this.gridNumber) {
      this.winCount++;
    }
  }

  async show(): Promise<any> {
    this.buttonText = 'OK';
    this.showModal = true;
    this.content = this.name + ', You killed ' + (this.winCount === 0 ? 'NO cats! Big Whoop!' : (this.winCount === 1 ? ' 1 cat! *_* Meh!'
      : this.winCount + ' cats! Hurray! '));
    this.title = 'Uh oh!! You lost!';
    if (typeof this.lastHighScore === 'number') {
      await this.getProgress(this.name);
      this.checkAndSaveNewHighScore(this.winCount, this.lastHighScore);
    } else {
      this.addNewHighscore({ username: this.name, highscore: this.winCount });
      this.lastHighScore = this.winCount;
    }
  }

  hide(): void {
    this.showModal = false;
    this.showTopScores = false;
    if (this.buttonText === 'Start') {
      this.name = document.getElementById("name")['value'];
      this.getProgress(this.name);
    }
    this.winCount = 0;
  }

  getProgress(name) {
    this.firestore.collection('users').valueChanges({ idField: 'userId' }).subscribe(data => {
      const dataElem = data.filter((dataElem: DataUser) => {
        return dataElem.username == name
      });
      if (dataElem && dataElem[0]) {
        this.userId = dataElem[0]['userId'];
        this.lastHighScore = dataElem[0]['highscore'];
      } else {
        this.name = name;
      }
    });
  }

  async checkAndSaveNewHighScore(newScore, lastScore) {
    if (newScore > lastScore) {
      // save new score as high score
      try {
        const saved = await this.savenewHighScore({ username: this.name, highscore: newScore });
      } catch (err) {
        this.addNewHighscore({ username: this.name, highscore: this.winCount });
      }
    }
  }

  savenewHighScore(data): void {
    var userRef = this.firestore.collection('users').doc(this.userId);
    var removeCapital = userRef.update({
      highscore: data.highscore
    });
  }

  async addNewHighscore(data) {
    await this.firestore.collection('users').add(data);
  }

  getTopScores() {
    const fireCollection = this.firestore.collection<any>('/users', ref => ref.orderBy('highscore', 'desc'));
    fireCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as DataUser;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))).subscribe(data => {
        this.topScores = data;
        this.showTopScores = true;
      });
  }
}
