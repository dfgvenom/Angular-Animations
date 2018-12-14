import { animate, query, stagger, style, transition, trigger, AnimationPlayer, AnimationBuilder } from '@angular/animations';
import { Component, HostBinding, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-builder',
  templateUrl: './animation-builder.component.html',
  styleUrls: ['./animation-builder.component.css'],
})
export class AnimationBuilderComponent {

  @ViewChild('withBuilder')
  elementRef: ElementRef;
  private player: AnimationPlayer;

  constructor(private animationBuilder: AnimationBuilder) { }

  createPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    let animationFactory;

    animationFactory = this.animationBuilder
      .build([
        style({ width: '*' }),
        animate(2000, style({ width: 0 })),
      ]);

    this.player = animationFactory.create(this.elementRef.nativeElement);
  }

  play() {
    if (!this.player) {
      this.createPlayer();
    }
    this.player.play();
  }

  pause() {
    if (this.player) {
      this.player.pause();
    }
  }

  reset() {
    if (this.player) {
      this.player.reset();
    }
  }
}
