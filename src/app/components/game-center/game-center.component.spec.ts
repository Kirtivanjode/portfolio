import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCenterComponent } from './game-center.component';

describe('GameCenterComponent', () => {
  let component: GameCenterComponent;
  let fixture: ComponentFixture<GameCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
