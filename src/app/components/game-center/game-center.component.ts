import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from '../tic-tac-toe/tic-tac-toe.component';
import { MemoryMatchComponent } from '../memory-match/memory-match.component';
import { RockPaperScissorsComponent } from '../rock-paper-scissors/rock-paper-scissors.component'; // ✅ Add this

@Component({
  selector: 'app-game-center',
  standalone: true,
  imports: [
    CommonModule,
    TicTacToeComponent,
    MemoryMatchComponent,
    RockPaperScissorsComponent,
  ],
  templateUrl: './game-center.component.html',
  styleUrls: ['./game-center.component.css'],
})
export class GameCenterComponent {
  selectedGame: string | null = null;

  games = [
    { title: 'Tic Tac Toe', icon: '❌⭕', id: 'tic-tac-toe' },
    { title: 'Memory Match', icon: '🧠', id: 'memory-match' },
    { title: 'Rock Paper Scissors', icon: '	⚫📄✂️', id: 'rps' }, 
  ];

  openGame(gameId: string) {
    this.selectedGame = gameId;
  }

  backToMenu() {
    this.selectedGame = null;
  }
}
