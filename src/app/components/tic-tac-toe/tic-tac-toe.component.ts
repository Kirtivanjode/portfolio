import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
})
export class TicTacToeComponent {
  boxes: string[] = Array(9).fill('');
  turnO: boolean = true;
  winner: string = '';
  count: number = 0;
  showMsg: boolean = false;
  playWithComputer: boolean = false;

  winPatterns: number[][] = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  ngOnInit(): void {
    this.resetGame();
  }

  handleClick(index: number): void {
    if (this.boxes[index] || this.winner) return;

    this.boxes[index] = this.turnO ? 'O' : 'X';
    this.turnO = !this.turnO;
    this.count++;

    if (this.checkWinner()) return;
    if (this.count === 9) {
      this.winner = 'Draw';
      this.showMsg = true;
      return;
    }

  
  }


  checkWinner(): boolean {
    for (let pattern of this.winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.boxes[a] &&
        this.boxes[a] === this.boxes[b] &&
        this.boxes[b] === this.boxes[c]
      ) {
        if (this.playWithComputer) {
          this.winner = this.boxes[a] === 'O' ? 'You' : 'Computer';
        } else {
          this.winner = this.boxes[a];
        }
        this.showMsg = true;
        return true;
      }
    }
    return false;
  }

  resetGame(): void {
    this.boxes = Array(9).fill('');
    this.turnO = true;
    this.count = 0;
    this.winner = '';
    this.showMsg = false;
  }


}
