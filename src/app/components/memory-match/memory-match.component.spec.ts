import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryMatchComponent } from './memory-match.component';

describe('MemoryMatchComponent', () => {
  let component: MemoryMatchComponent;
  let fixture: ComponentFixture<MemoryMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
