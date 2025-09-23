import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-match.component.html',
  styleUrls: ['./memory-match.component.css'],
})
export class MemoryMatchComponent implements OnInit {
  cards: { id: number; icon: string; flipped: boolean; matched: boolean }[] =
    [];
  flippedCards: number[] = [];
  icons = ['🍎', '🍊', '🍇', '🍓', '🍌', '🥝'];

  ngOnInit(): void {
    this.resetGame();
  }

  resetGame(): void {
    const pairs = [...this.icons, ...this.icons];
    this.cards = pairs
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    this.flippedCards = [];
  }

  flipCard(index: number): void {
    const card = this.cards[index];
    if (card.flipped || card.matched || this.flippedCards.length === 2) return;

    card.flipped = true;
    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      const [first, second] = this.flippedCards;
      setTimeout(() => {
        if (this.cards[first].icon === this.cards[second].icon) {
          this.cards[first].matched = true;
          this.cards[second].matched = true;
        } else {
          this.cards[first].flipped = false;
          this.cards[second].flipped = false;
        }
        this.flippedCards = [];
      }, 1000);
    }
  }
}
