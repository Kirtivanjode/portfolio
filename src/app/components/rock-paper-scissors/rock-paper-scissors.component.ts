import { Component } from '@angular/core';

@Component({
  selector: 'app-rock-paper-scissors',
  standalone: true,
  imports: [],
  templateUrl: './rock-paper-scissors.component.html',
  styleUrl: './rock-paper-scissors.component.css',
})
export class RockPaperScissorsComponent {
  userScore: number = 0;
  compScore: number = 0;
  message: string = 'Play your move';
  messageColor: string = '#081b31';

  choices: string[] = ['rock', 'paper', 'scissors'];

  playGame(userChoice: string): void {
    const compChoice = this.generateCompChoice();

    if (userChoice === compChoice) {
      this.drawGame();
    } else {
      let userWins = this.doesUserWin(userChoice, compChoice);
      this.showWinner(userWins, userChoice, compChoice);
    }
  }

  generateCompChoice(): string {
    const randIndex = Math.floor(Math.random() * 3);
    return this.choices[randIndex];
  }

  drawGame(): void {
    this.message = 'Game was Draw. Play again.';
    this.messageColor = '#081b31';
  }

  showWinner(userWins: boolean, userChoice: string, compChoice: string): void {
    if (userWins) {
      this.userScore++;
      this.message = `You win! Your ${userChoice} beats ${compChoice}`;
      this.messageColor = 'green';
    } else {
      this.compScore++;
      this.message = `You lost. ${compChoice} beats your ${userChoice}`;
      this.messageColor = 'red';
    }
  }

  doesUserWin(user: string, comp: string): boolean {
    return (
      (user === 'rock' && comp === 'scissors') ||
      (user === 'paper' && comp === 'rock') ||
      (user === 'scissors' && comp === 'paper')
    );
  }
}
