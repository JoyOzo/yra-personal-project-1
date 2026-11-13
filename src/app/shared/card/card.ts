import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardItem } from '../models/card.model';
import { HoverLift } from '../directives/hover-lift';

@Component({
  selector: 'app-card',
  imports: [HoverLift],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input({ required: true }) item!: CardItem;
  @Output() action = new EventEmitter<CardItem>();

  onAction() {
    this.action.emit(this.item);
  }
}